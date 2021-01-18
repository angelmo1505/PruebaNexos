import { TestBed } from '@angular/core/testing';

import { ConsulDataService } from './consul-data.service';

describe('ConsulDataService', () => {
  let service: ConsulDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsulDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
