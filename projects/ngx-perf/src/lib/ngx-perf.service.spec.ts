import { TestBed } from '@angular/core/testing';

import { NgxPerfService } from './ngx-perf.service';

describe('NgxPerfService', () => {
  let service: NgxPerfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPerfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
