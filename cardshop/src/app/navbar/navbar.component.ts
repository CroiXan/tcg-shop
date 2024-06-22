import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

/**
 * @description
 * Componente para el manejo de navbar, contiene accion para busqueda de cartas por nombre.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  /**
   * Formulario para manejar filtro de busqueda
   */
  filterForm!: FormGroup;
  /**
   * Booleano para indicar si el usuario se encuentra logueado
   */
  isLoggedIn: boolean = false;

  /**
   * Constructor con dependencias a la capa service.
   * @param router Manejo de redirecciones
   * @param authService Funciones para manejo de sesion
   */
  constructor(private router: Router, private authService: AuthService){};

  /**
   * Iniciacion de componente.
   * Suscripcion a variable que indica si hay usuario logueado.
   * Iniciacion de formulario para filtros de busqueda.
   */
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.filterForm = new FormGroup({
      search: new FormControl('')
    });
  }

  /**
   * Accion de boton para realizar la busqueda en el catalogo segun los filtros
   */
  onSearch(){
    const search = this.filterForm.get('search')?.value.toLowerCase() || '';
    if(search !== ''){
      this.router.navigate(['/buscar/'+search]);
    }
  }

  /**
   * Accion de boton para que el usuario salga de su session actual
   */
  logout(){
    this.authService.logout();
    alert('Se ha cerrado sesión.');
  }

}
