import { Routes } from '@angular/router';
import { CarditemListComponent } from './carditem-list/carditem-list.component';

export const routes: Routes = [
    { path: '', component: CarditemListComponent},
    { path: 'categoria/:categoria', component: CarditemListComponent},
    { path: 'buscar/:search', component: CarditemListComponent}
];
