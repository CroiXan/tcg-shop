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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logedUser: User = {} as User;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userAddress = new BehaviorSubject<Address[]>([] as Address[]);
  private currentShoppingCart = new BehaviorSubject<ShoppingCart>({} as ShoppingCart);

  constructor(
    private router: Router, 
    private userService: UserService,
    private addressService: AddressService,
    private shoppingCartService: ShoppingCartService
  ) {}

  login(userName: string, password: string): boolean {

    this.logedUser = this.userService.getUserAuth(userName,password);

    if(this.logedUser.id === 0 || this.logedUser.UserName === ''){
        this.loggedIn.next(false);
        return false;
    }
    this.userAddress.next(this.addressService.getAddressByUser(this.logedUser.id));
    this.loggedIn.next(true);
    return true;
  }

  getUser(){
    return this.logedUser;
  }

  updateBasicInfo(firstName: string, lastName: string, email: string): boolean {
    this.logedUser.FirstName = firstName;
    this.logedUser.LastName = lastName;
    this.logedUser.Email = email;
    return this.userService.updateUser(this.logedUser);
  }

  createAddress(name: string, number: number, region: string, Commune: string){
    this.addressService.createAddress(this.logedUser.id,name,number,region,Commune);
    this.userAddress.next(this.addressService.getAddressByUser(this.logedUser.id));
  }

  getRole(): string {
    return this.logedUser.Role;
  }

  logout() {
    this.logedUser = {} as User;
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(){
    return this.logedUser.id !== 0 && this.logedUser.UserName !== '' && this.logedUser.id !== undefined && this.logedUser.UserName !== undefined;
  }

  addItemToShoppingCart(cardId: number): boolean{
    if(this.currentShoppingCart.value.id === undefined){
      this.currentShoppingCart.next(this.shoppingCartService.createShoppingcar(this.logedUser.id));
    }
    const addItemResult = this.shoppingCartService.addItemToShoppingCart(this.logedUser.id,cardId,this.currentShoppingCart.value.id);
    this.currentShoppingCart.next(addItemResult[0]);
    return addItemResult[1];
  }

  updateShoppingCartStatus(status: CartStatus){
    if(this.currentShoppingCart.value.id !== undefined){
      this.currentShoppingCart.value.Status = status;
      this.shoppingCartService.updateShoppingCart(this.currentShoppingCart.value);
    }
  }

  getCurrentShoppingCart(){
    return this.currentShoppingCart.asObservable();
  }

  getCurrentUserAddress(){
    return this.userAddress.asObservable();
  }

  isAuthenticated() {
    return this.loggedIn.asObservable();
  }
}