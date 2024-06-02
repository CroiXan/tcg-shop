import { Component } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';
import { AddressManagementComponent } from '../address-management/address-management.component';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    UserManagementComponent,
    AddressManagementComponent
  ],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css'
})
export class AccountManagementComponent {

}
