import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-card-manage',
  standalone: true,
  imports: [
  ],
  templateUrl: './card-manage.component.html',
  styleUrl: './card-manage.component.css'
})
export class CardManageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  goToDetail(){
    if(this.authService.getUser().id === undefined){
      alert('No puede ingresar a esta funcion');
      this.router.navigate(['/login']);
    }
    this.router.navigate(['/card-detail']);
  }
  
}
