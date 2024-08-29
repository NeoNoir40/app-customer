import { TestBed } from '@angular/core/testing';

import { CatchTokenService } from './catch-token.service';

describe('CatchTokenService', () => {
  let service: CatchTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatchTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
