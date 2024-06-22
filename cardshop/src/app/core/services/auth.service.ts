import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../models/address.model';
import { AddressService } from './address.service';
import { ShoppingCart } from '../models/shopping-cart.model';
import { ShoppingCartService } from './shopping-cart.service';
import { CartStatus } from '../enum/cart-status.enum';
import { CardItem } from '../models/carditem.model';

/**
 * @description
 * Funciones para manejo de informacion persistente del usuario durante su session
 */
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  /**
   * Variable para manejo de informacion de ususario
   */
  private logedUser: User = {} as User;
  /**
   * Variable suscribible booleana para indicar si el usuario se encuentra logueado
   */
  private loggedIn = new BehaviorSubject<boolean>(false);
  /**
   * Variable suscribible para almacenar las direcciones del ususario logueado
   */
  private userAddress = new BehaviorSubject<Address[]>([] as Address[]);
  /**
   * Variable suscribible para guardar el carrito de compras
   */
  private currentShoppingCart = new BehaviorSubject<ShoppingCart>({} as ShoppingCart);
  /**
   * variable para guardar la carta seleccionada
   */
  private selectedCard: CardItem = {} as CardItem;

  /**
   * Constructor con dependencias a la capa service.
   * @param router Manejo de redirecciones
   * @param userService Funciones de manejo de usuario
   * @param addressService Funciones de manejo de direcciones
   * @param shoppingCartService Funciones de manejo de carrito
   */
  constructor(
    private router: Router, 
    private userService: UserService,
    private addressService: AddressService,
    private shoppingCartService: ShoppingCartService
  ) {}

  /**
   * Funcion para loguear usuario en la aplicacion
   * @param userName Nombre de usuario
   * @param password contrasena de usuario
   * @returns booleano indicando si se logro loguear
   */
  login(userName: string, password: string): boolean {

    this.logedUser = this.userService.getUserAuth(userName,password);

    if(this.logedUser.id === undefined || this.logedUser.id === 0 || this.logedUser.UserName === '' ){
        this.loggedIn.next(false);
        return false;
    }

    this.setUserIdToShoppingCart();
    this.userAddress.next(this.addressService.getAddressByUser(this.logedUser.id));
    this.loggedIn.next(true);
    return true;
  }

  /**
   * Funcion para obetener objeto User
   * @returns Usuario Actual
   */
  getUser(){
    return this.logedUser;
  }

  /**
   * Funcion para editar Nombre, Apellido y correo electronico del usuario logueado
   * @param firstName Nombre
   * @param lastName Apellido
   * @param email Correo electronico
   * @returns Ususario actualizado
   */
  updateBasicInfo(firstName: string, lastName: string, email: string): boolean {
    this.logedUser.FirstName = firstName;
    this.logedUser.LastName = lastName;
    this.logedUser.Email = email;
    return this.userService.updateUser(this.logedUser);
  }

  /**
   * Funcion para crear una direccion de entrega para el usario logueado.
   * @param name Nombre de direccon
   * @param number Numero de direccion
   * @param region Region de direccion
   * @param Commune Comuna de direccion
   */
  createAddress(name: string, number: number, region: string, Commune: string){
    this.addressService.createAddress(this.logedUser.id,name,number,region,Commune);
    this.userAddress.next(this.addressService.getAddressByUser(this.logedUser.id));
  }

  /**
   * Obtiene el rol del usuario logueado
   * @returns Rol de usuario
   */
  getRole(): string {
    return this.logedUser.Role;
  }

  /**
   * Funcion para desloguearse de la aplicacion.
   * Se redirige a la pantalla principal.
   */
  logout() {
    this.logedUser = {} as User;
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  /**
   * Funcion para indicar si se ha logueado un usuario
   * @returns booleano que indica si se ha logueado un usario
   */
  isLoggedIn(){
    return this.logedUser.id !== 0 && this.logedUser.UserName !== '' && this.logedUser.id !== undefined && this.logedUser.UserName !== undefined;
  }

  /**
   * Funcion para agregar una carta al carrito de compras, si no hay carrito de compras en la sesion actual crea uno.
   * @param cardId Identificador de carta seleccionado
   * @returns booleano que indica si la carta tiene stock
   */
  addItemToShoppingCart(cardId: number): boolean{
    if(this.currentShoppingCart.value.id === undefined || this.currentShoppingCart.value.Status != CartStatus.Abierto){
      this.currentShoppingCart.next(this.shoppingCartService.createShoppingcar(this.logedUser.id));
    }
    const addItemResult = this.shoppingCartService.addItemToShoppingCart(this.logedUser.id,cardId,this.currentShoppingCart.value.id);
    this.currentShoppingCart.next(addItemResult[0]);
    return addItemResult[1];
  }

  /**
   * Funcion para cambiar el estado al carrito de compras de la sesion actual
   * @param status Valor de estado del Carrito
   */
  updateShoppingCartStatus(status: CartStatus){
    if(this.currentShoppingCart.value.id !== undefined){
      this.currentShoppingCart.value.Status = status;
      this.shoppingCartService.updateShoppingCart(this.currentShoppingCart.value);
    }
  }

  /**
   * Funcion para agregar id de usuario a un carrito.
   * Se puede crear un carrito de forma anonima al momento de loguearse se asigna el id de usuario al carrito.
   */
  setUserIdToShoppingCart(){
    if(this.currentShoppingCart.value.id !== undefined){
      this.currentShoppingCart.value.UserId = this.logedUser.id;
      this.shoppingCartService.updateShoppingCart(this.currentShoppingCart.value);
    }
  }

  /**
   * Funcion para obtener al carrito de compras de la sesion actual
   * @returns 
   */
  getCurrentShoppingCart(){
    return this.currentShoppingCart.asObservable();
  }

  /**
   * Funcion para obtener las direcciones del usuario actual de la sesion
   * @returns Listado de direcciones
   */
  getCurrentUserAddress(){
    return this.userAddress.asObservable();
  }

  /**
   * Funcion que retorna booleano si hay un usuario de la sesion
   * @returns 
   */
  isAuthenticated() {
    return this.loggedIn.asObservable();
  }

  /**
   * Funcion para setear la carta selecionada
   * @param selected Carta sleccionada
   */
  setSelectedCardForManage(selected: CardItem){
    this.selectedCard = selected;
  }

  /**
   * Fucion para obteener carta selecionada
   * @returns Carta seleccionada
   */
  getSelectedCardForManage(): CardItem{
    return this.selectedCard;
  }

}