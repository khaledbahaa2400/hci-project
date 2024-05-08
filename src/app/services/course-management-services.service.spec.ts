import { TestBed } from '@angular/core/testing';

import { CourseManagementServicesService } from './course-management-services.service';

describe('CourseManagementServicesService', () => {
  let service: CourseManagementServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseManagementServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
