import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

/**
 * @description
 * Clase con Funciones de API de manipulacion de usuarios
 */
@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  /**
   * Headers para invocacion de API POST
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer a8db4a92-87b9-4210-86e5-4a56a84e17d5' 
    })
  }

  /**
   * Enpoint de API de Informacion de usuario
   */
  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/users.json?alt=media&token=41e3ea2d-98dd-400d-a6b2-1c4649bc7596';

  /**
   * Constructor con dependencias a libreria HTTP
   * @param http Libreria HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Funcion de Metodo GET de API de usuarios
   * @returns Observable con listado de usuarios
   */
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  /**
   * Funcion para crear Usuario
   * @param userName Nombre de Usuario
   * @param firstName Nombre
   * @param lastName Apellido
   * @param password contrasena
   * @param email Correo Electronico
   * @param callback Funcion para retornar resultado booleano
   */
  createUser(
    userName: string, 
    firstName: string, 
    lastName: string, 
    password: string, 
    email: string,
    callback: (result: boolean) => void){

      this.getUsers().subscribe(
        response => {
          if(response.find(user => user.UserName === userName) !== undefined){
            callback(false)
            return
          }
      
          if(this.checkEmail(email,response)){
            callback(false)
            return
          }
      
          let newUser: User = {} as User;
          const newId = response.reduce((maxId, user) => {
              return Math.max(maxId, user.id);
          }, 0) + 1;
      
          newUser.id = newId;
          newUser.UserName = userName;
          newUser.FirstName = firstName;
          newUser.LastName = lastName;
          newUser.Password = password;
          newUser.Email = email;
          newUser.Role = 'user';
          newUser.IsActive = true;
      
          response.push(newUser);
          this.editUsersJson(response).subscribe(
            result => {
              console.log('usuario creado')
              callback(true)
            },
            error => {
              console.error('error al crear usuarios',error)
              callback(false)
            }
          )

        },
        error => {
          console.error('error al obtener usuarios',error)
          callback(false)
        }
      );

  }

  /**
   * Funcion para buscar email en el listado de usuarios
   * @param email Email para buscar
   * @param userList Listado de Usuarios
   * @returns booleano que indica si se encontro el email
   */
  checkEmail(email: string, userList: User[]): boolean{
    return (userList.find(user => user.Email === email) !== undefined)
  }

  /**
   * Funcion que busca email en API de Usuarios
   * @param email Email a buscar
   * @param callback Funcion que retorna booleano que indica si se encontro el email
   */
  checkEmailApi(email: string, callback: (result: boolean) => void){
    this.getUsers().subscribe(
      response => {
        callback(this.checkEmail(email,response))
      },
      error => {
        callback(false);
      }
    )
  }

  /**
   * Funcion que entrega usuario segun el nombre de usuario y contrasena
   * @param userName Nombre de ususario
   * @param password Contrasena
   * @param callback Funcion que retorna objeto Ususario resultante
   */
  getUserAuth(
    userName: string, 
    password: string,
    callback: (result: User) => void) {
      this.getUsers().subscribe(
        response => {
          callback(response.find(user => user.UserName === userName && user.Password === password) || {} as User)
        },
        error => {
          console.error('error al obtener usuarios',error)
        }
      );
  }

  /**
   * Funcion para actualizar la informacion de usuario
   * @param updatedUser Usuario modificado
   * @param callback Funcion que retorna booleano indicando si se logro ejecutar 
   */
  updateUser(updatedUser: User, callback: (result: boolean) => void) {
    this.getUsers().subscribe(
      response => {
        const index = response.findIndex(user => user.id === updatedUser.id && user.UserName === updatedUser.UserName);
        if(index !== -1){
          response[index] = updatedUser;

          this.editUsersJson(response).subscribe(
            response => {
              callback(true)
            },
            error => {
              callback(false)
            }
          );
          
        }else{
          callback(false)
          return;
        }
      },
      error => {
        console.error('error al obtener usuarios',error)
        callback(false)
        return;
      }
    );
  }

  /**
   * Funcion de Metodo POST de API de Usuarios
   * @param userList Listado modificado de usuarios
   * @returns Retorna Observable de llamado Post de API
   */
  editUsersJson(userList: User[]): Observable<any>{
    return this.http.post(this.url,userList,this.httpOptions);
  }

}
