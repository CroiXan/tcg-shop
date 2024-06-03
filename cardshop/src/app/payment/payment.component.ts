import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  isPaymentSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit() {

    this.authService.getCurrentShoppingCart().subscribe(shoppingCart => {
      if(shoppingCart.id === undefined || shoppingCart.id === 0){
        alert('ha ocurrido un error');
        this.router.navigate(['/']);
      }
    });

    setTimeout(() => {
      this.isPaymentSuccess = true;
      this.redirect();
    }, 4000);

  }

  redirect() {
    setTimeout(() => {
      this.router.navigate(['/orden-realizada']);
    }, 4000);
  }

}
