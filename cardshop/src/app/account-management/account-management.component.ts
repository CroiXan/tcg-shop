import { Component } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';
import { AddressManagementComponent } from '../address-management/address-management.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { CardManageComponent } from '../card-manage/card-manage.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    UserManagementComponent,
    AddressManagementComponent,
    OrderListComponent,
    CardManageComponent,
    CommonModule
  ],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css'
})
export class AccountManagementComponent {

  userRole: string = '';

  constructor(
    private authService : AuthService
  ){}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
  }

}
