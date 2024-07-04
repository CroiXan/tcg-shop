import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  
}
