import { TestBed } from '@angular/core/testing';

import { CourseManagementServiceService } from './course-management-service.service';

describe('CourseManagementServiceService', () => {
  let service: CourseManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
