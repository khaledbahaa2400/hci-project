import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegHeaderComponent } from './reg-header.component';

describe('RegHeaderComponent', () => {
  let component: RegHeaderComponent;
  let fixture: ComponentFixture<RegHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
