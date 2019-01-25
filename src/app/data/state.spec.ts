import { TestBed } from '@angular/core/testing';

import { State } from './state';

describe('State', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: State = TestBed.get(State);
    expect(service).toBeTruthy();
  });
});
