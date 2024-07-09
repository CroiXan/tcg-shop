import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressManagementComponent } from './address-management.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddressManagementComponent', () => {
  let component: AddressManagementComponent;
  let fixture: ComponentFixture<AddressManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AddressManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
