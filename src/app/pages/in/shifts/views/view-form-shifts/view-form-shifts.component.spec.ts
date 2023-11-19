import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormShiftsComponent } from './view-form-shifts.component';

describe('ViewFormShiftsComponent', () => {
  let component: ViewFormShiftsComponent;
  let fixture: ComponentFixture<ViewFormShiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFormShiftsComponent]
    });
    fixture = TestBed.createComponent(ViewFormShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
