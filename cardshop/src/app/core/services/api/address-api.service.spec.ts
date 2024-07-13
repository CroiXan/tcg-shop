import { TestBed } from '@angular/core/testing';

import { AddressApiService } from './address-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddressApiService', () => {
  let service: AddressApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddressApiService]
    });
    service = TestBed.inject(AddressApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
