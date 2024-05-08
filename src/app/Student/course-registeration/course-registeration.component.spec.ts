import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRegisterationComponent } from './course-registeration.component';

describe('CourseRegisterationComponent', () => {
  let component: CourseRegisterationComponent;
  let fixture: ComponentFixture<CourseRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseRegisterationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
