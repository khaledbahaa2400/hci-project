import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboaredComponent } from './admin-dashboared.component';

describe('AdminDashboaredComponent', () => {
  let component: AdminDashboaredComponent;
  let fixture: ComponentFixture<AdminDashboaredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboaredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashboaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
