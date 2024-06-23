import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarditemListComponent } from './carditem-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CarditemListComponent', () => {
  let component: CarditemListComponent;
  let fixture: ComponentFixture<CarditemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarditemListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ categoria: ''})
           }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarditemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
