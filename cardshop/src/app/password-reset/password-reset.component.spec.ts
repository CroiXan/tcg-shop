import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetComponent } from './password-reset.component';
import { ActivatedRoute } from '@angular/router';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordResetComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
