import { Component } from '@angular/core';
import { AddressCreateComponent } from '../address-create/address-create.component';
import { CommonModule } from '@angular/common';
import { Address } from '../core/models/address.model';
import { AuthService } from '../core/services/auth.service';

/**
 * Componente para listar las direcciones registradas del usuario
 */
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
  /**
   * Listado de direcciones del usuario
   */
  userAddressList: Address[] = [] as Address[];

  /**
   * Constructor con dependencia a manejo de sesion
   * @param authService Funciones de manejo de sesion
   */
  constructor(private authService: AuthService){}

  /**
   * Inciacion de variable del listado de direcciones.
   */
  ngOnInit(): void {
    this.authService.getCurrentUserAddress().subscribe(addressList => {
      this.userAddressList = addressList;
    });
  }

}
