import { Component } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';
import { AddressManagementComponent } from '../address-management/address-management.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { CardManageComponent } from '../card-manage/card-manage.component';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    UserManagementComponent,
    AddressManagementComponent,
    OrderListComponent,
    CardManageComponent
  ],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css'
})
export class AccountManagementComponent {

}
