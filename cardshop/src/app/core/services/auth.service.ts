import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logedUser: User = {} as User;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private userService: UserService) {}

  login(userName: string, password: string): boolean {

    this.logedUser = this.userService.getUserAuth(userName,password);

    if(this.logedUser.id === 0 || this.logedUser.UserName === ''){
        this.loggedIn.next(false);
        return false;
    }
    this.loggedIn.next(true);
    return true;
  }

  getRole(): string {
    return this.logedUser.Role;
  }

  logout() {
    this.logedUser = {} as User;
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.loggedIn.asObservable();
  }
}