import { TestBed } from '@angular/core/testing';

import { RecoveryService } from './recovery.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecoveryService', () => {
  let service: RecoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecoveryService]
    });
    service = TestBed.inject(RecoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
