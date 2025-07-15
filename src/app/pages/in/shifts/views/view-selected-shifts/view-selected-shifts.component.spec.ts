import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedShiftsComponent } from './view-selected-shifts.component';

describe('ViewSelectedShiftsComponent', () => {
  let component: ViewSelectedShiftsComponent;
  let fixture: ComponentFixture<ViewSelectedShiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSelectedShiftsComponent]
    });
    fixture = TestBed.createComponent(ViewSelectedShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
