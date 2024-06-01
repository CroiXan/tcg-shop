import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logedUser: User = {} as User;

  constructor(private router: Router, private userService: UserService) {}

  login(userName: string, password: string): boolean {

    this.logedUser = this.userService.getUserAuth(userName,password);

    if(this.logedUser.id === 0 || this.logedUser.UserName === ''){
        return false;
    }

    return true;
  }

  getRole(): string {
    return this.logedUser.Role;
  }

  logout() {
    this.logedUser = {} as User;
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.logedUser;
  }
}