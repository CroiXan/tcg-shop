import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

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

  filterForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService){};

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.filterForm = new FormGroup({
      search: new FormControl('')
    });
  }

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
