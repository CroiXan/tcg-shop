import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  filterForm!: FormGroup;

  constructor(private router: Router){};

  ngOnInit(): void {
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

}
