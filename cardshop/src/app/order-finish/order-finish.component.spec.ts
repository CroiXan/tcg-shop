import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFinishComponent } from './order-finish.component';
import { ActivatedRoute } from '@angular/router';

describe('OrderFinishComponent', () => {
  let component: OrderFinishComponent;
  let fixture: ComponentFixture<OrderFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFinishComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
