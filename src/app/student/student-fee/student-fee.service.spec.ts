import { TestBed } from '@angular/core/testing';

import { StudentFeeService } from './student-fee.service';

describe('StudentFeeService', () => {
  let service: StudentFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
