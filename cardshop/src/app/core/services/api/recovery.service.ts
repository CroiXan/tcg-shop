import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recovery } from '../../models/Recovery.model';
import { UserApiService } from './user-api.service';
import { User } from '../../models/user.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 8c91f5c5-305e-4ac9-86b7-bd01e3634afe' 
    })
  }

  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/recovery.json?alt=media&token=3fa8f2c2-2089-4013-bfaf-237a30543693';

  constructor(
    private http: HttpClient,
    private userApiService: UserApiService
  ) { }

  getRecoveries(): Observable<Recovery[]>{
    return this.http.get<Recovery[]>(this.url);
  }

  editRecoveriesJson(recoveryList: Recovery[]): Observable<any>{
    return this.http.post(this.url,recoveryList,this.httpOptions);
  }

  createRecovery(email:string, callback: (result: string) => void){

    this.getRecoveries().subscribe(
      response => {
        this.userApiService.getUsers().subscribe(
          userResponse =>{

            let findUser = userResponse.find(user => user.Email === email);
            if(findUser == undefined){
              callback('');
              return;
            }

            let recovery = {} as Recovery;
            recovery.UserId = findUser.id;
            recovery.date = new Date();
            recovery.token = this.generateRandomToken();

            response.push(recovery);
            this.editRecoveriesJson(response).subscribe();

            callback('');
            return;
          },
          error => {
            callback('');
              return;
          }
        );
      },
      error => {
        callback('');
        return;
      }
    );

  }

  /**
     * Funcion para generar token aleatorio
     * @returns Token
     */
  generateRandomToken(): string {
    const randomBytes = CryptoJS.lib.WordArray.random(16);
    return randomBytes.toString(CryptoJS.enc.Hex);
  }

  /**
     * Funcion para encontrar item de recuperacion segun un token dado
     * @param token Token de recuperacion
     * @returns Item de recuperacion de clave
     */
  findRecovery(token: string, callback: (result: Recovery) => void) {

    this.getRecoveries().subscribe(
      response => {
        callback(response.find(recovery => recovery.token === token) || {} as Recovery);
      },
      error => {
        callback({} as Recovery);
        return;
      }
    );
    
  }

  /**
     * Funcion para checkear validez de token de recuperacion
     * @param token Token de recuperacion
     * @returns mensaje de error
     */
  checkRecovery(token: string, callback: (result: string) => void) {

    this.findRecovery(token, recovery => {
      let currentDate = new Date();

      if(recovery.UserId == undefined){
        callback('error de recuperacion');
        return;
      }

      const recoverytimestamp = recovery.date.getTime();
      const currenttimestamp = currentDate.getTime();
      const differenceInMillis = Math.abs(currenttimestamp - recoverytimestamp);
      const differenceInHours = differenceInMillis / (1000 * 60 * 60);

      if(differenceInHours > 1){
        callback('token ha expirado');
          return;
      }

      callback('');
      return;
    });

  }

  /**
     * Funcion para actualizar contrasena dado un token 
     * @param token token de recuperacion
     * @param password nueva contrasena
     * @returns mensaje de error
     */
  updatePassword(token: string, password: string, callback: (result: string) => void) {

    this.findRecovery(token, recovery => {
      let currentDate = new Date();

      if(recovery.UserId == undefined){
        callback('error de recuperacion');
        return;
      }

      const recoverytimestamp = recovery.date.getTime();
      const currenttimestamp = currentDate.getTime();
      const differenceInMillis = Math.abs(currenttimestamp - recoverytimestamp);
      const differenceInHours = differenceInMillis / (1000 * 60 * 60);

      if(differenceInHours > 1){
        callback('token ha expirado');
        return;
      }

      this.userApiService.getUsers().subscribe(
        response => {
          let user: User = response.find(user => user.id === recovery.UserId ) || {} as User;

          if(user.id == undefined){
            callback('error de recuperacion');
            return;
          }

          user.Password = password;
    
          this.userApiService.updateUser(user,
            result => {
              if (!result) {
                callback('error al actualizar usuario');
                return;
              }
              callback('');
              return;
            }
          );
    
        },
        error => {
          callback('error de sistema, intentelo mas tarde');
          return;
        }
      );

    });
    
  }

}
