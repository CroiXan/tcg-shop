import { Routes } from '@angular/router';
import { CarditemListComponent } from './carditem-list/carditem-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { authGuardGuard } from './auth-guard.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderFinishComponent } from './order-finish/order-finish.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

export const routes: Routes = [
    { path: '', component: CarditemListComponent},
    { path: 'categoria/:categoria', component: CarditemListComponent},
    { path: 'buscar/:search', component: CarditemListComponent},
    { path: 'registro', component: RegistrationFormComponent},
    { path: 'login', component: LoginComponent},
    { path: 'carrito', component: ShoppingCartComponent},
    { path: 'pago', component: PaymentComponent, canActivate: [authGuardGuard]},
    { path: 'orden-realizada', component: OrderFinishComponent, canActivate: [authGuardGuard]},
    { path: 'cuenta', component: AccountManagementComponent, canActivate: [authGuardGuard]},
    { path: 'card-detail', component: CardDetailComponent, canActivate: [authGuardGuard]},
    { path: 'recuperar-contrasena', component: PasswordRecoveryComponent}
];
