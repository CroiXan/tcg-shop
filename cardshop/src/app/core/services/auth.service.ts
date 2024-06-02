import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../models/address.model';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logedUser: User = {} as User;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userAddress = new BehaviorSubject<Address[]>([] as Address[]);

  constructor(
    private router: Router, 
    private userService: UserService,
    private addressService: AddressService
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

  getCurrentUserAddress(){
    return this.userAddress.asObservable();
  }

  isAuthenticated() {
    return this.loggedIn.asObservable();
  }
}