import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementComponent } from './account-management.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountManagementComponent', () => {
  let component: AccountManagementComponent;
  let fixture: ComponentFixture<AccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccountManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
