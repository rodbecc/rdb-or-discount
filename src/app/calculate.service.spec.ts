import { TestBed } from '@angular/core/testing';

import { CalculateService } from './calculate.service';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateService);
  });


  it('should calculate the accInterest', () => {
    expect(service.calculate2).toBeTruthy();
    expect(service.calculate2(1000, 10, 3)).toEqual(227.66666666666669)
  })
});
