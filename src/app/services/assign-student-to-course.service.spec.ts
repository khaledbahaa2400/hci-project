import { TestBed } from '@angular/core/testing';

import { AssignStudentToCourseService } from './assign-student-to-course.service';

describe('AssignStudentToCourseService', () => {
  let service: AssignStudentToCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignStudentToCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
