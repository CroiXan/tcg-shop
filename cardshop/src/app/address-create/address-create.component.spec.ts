import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCreateComponent } from './address-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddressCreateComponent', () => {
  let component: AddressCreateComponent;
  let fixture: ComponentFixture<AddressCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AddressCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
