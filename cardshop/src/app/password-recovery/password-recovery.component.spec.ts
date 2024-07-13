import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryComponent } from './password-recovery.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasswordRecoveryComponent', () => {
  let component: PasswordRecoveryComponent;
  let fixture: ComponentFixture<PasswordRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PasswordRecoveryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
