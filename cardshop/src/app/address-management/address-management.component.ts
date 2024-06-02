import { Component } from '@angular/core';
import { AddressCreateComponent } from '../address-create/address-create.component';
import { CommonModule } from '@angular/common';
import { Address } from '../core/models/address.model';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-address-management',
  standalone: true,
  imports: [
    AddressCreateComponent,
    CommonModule
  ],
  templateUrl: './address-management.component.html',
  styleUrl: './address-management.component.css'
})
export class AddressManagementComponent {

  userAddressList: Address[] = [] as Address[];

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.getCurrentUserAddress().subscribe(addressList => {
      this.userAddressList = addressList;
    });
  }

}
