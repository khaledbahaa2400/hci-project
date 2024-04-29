import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsProgressComponent } from './students-progress.component';

describe('StudentsProgressComponent', () => {
  let component: StudentsProgressComponent;
  let fixture: ComponentFixture<StudentsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
