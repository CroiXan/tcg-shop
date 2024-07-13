import { TestBed } from '@angular/core/testing';

import { ShoppingCartApiService } from './shopping-cart-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShoppingCartApiService', () => {
  let service: ShoppingCartApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShoppingCartApiService]
    });
    service = TestBed.inject(ShoppingCartApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
