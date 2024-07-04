import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer a8db4a92-87b9-4210-86e5-4a56a84e17d5' 
    })
  }

  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/users.json?alt=media&token=41e3ea2d-98dd-400d-a6b2-1c4649bc7596';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

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
      
          callback(true)
        },
        error => {
          console.error('error al obtener usuarios',error)
        }
      );

  }

  checkEmail(email: string, userList: User[]): boolean{
    return (userList.find(user => user.Email === email) !== undefined)
  }

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

  editUsersJson(userList: User[]): Observable<any>{
    return this.http.post(this.url,userList,this.httpOptions);
  }

}
