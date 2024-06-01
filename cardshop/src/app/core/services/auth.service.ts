import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string = '';

  constructor(private router: Router, private userService: UserService) {}

  login(userName: string, password: string): boolean {

    const user: User|undefined = this.userService.getUserAuth(userName,password);

    if(user === undefined){
        return false;
    }

    var role = user?.Role;

    this.userRole = role;

    return true;
  }

  getRole(): string {
    return this.userRole;
  }

  logout() {
    this.userRole = '';
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.userRole;
  }
}