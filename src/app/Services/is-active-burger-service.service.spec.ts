import { TestBed } from '@angular/core/testing';

import { IsActiveBurgerServiceService } from './is-active-burger-service.service';

describe('IsActiveBurgerServiceService', () => {
  let service: IsActiveBurgerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsActiveBurgerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
