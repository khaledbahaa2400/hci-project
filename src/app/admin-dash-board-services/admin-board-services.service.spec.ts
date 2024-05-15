import { TestBed } from '@angular/core/testing';

import { AdminBoardServicesService } from './admin-board-services.service';

describe('AdminBoardServicesService', () => {
  let service: AdminBoardServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBoardServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
