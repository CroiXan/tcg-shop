import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardManageComponent } from './card-manage.component';

describe('CardManageComponent', () => {
  let component: CardManageComponent;
  let fixture: ComponentFixture<CardManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
