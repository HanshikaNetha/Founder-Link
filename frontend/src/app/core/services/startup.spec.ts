import { TestBed } from '@angular/core/testing';

import { Startup } from './startup';

describe('Startup', () => {
  let service: Startup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Startup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
