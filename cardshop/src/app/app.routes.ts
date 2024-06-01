import { Routes } from '@angular/router';
import { CarditemListComponent } from './carditem-list/carditem-list.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: CarditemListComponent},
    { path: 'categoria/:categoria', component: CarditemListComponent},
    { path: 'buscar/:search', component: CarditemListComponent},
    { path: 'registro', component: RegistrationFormComponent},
    { path: 'login', component: LoginComponent}
];
