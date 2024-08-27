import { TestBed } from '@angular/core/testing';

import { EnviosDataService } from './envios-data.service';

describe('EnviosDataService', () => {
  let service: EnviosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
