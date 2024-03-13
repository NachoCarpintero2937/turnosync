import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormUserComponent } from './view-form-user.component';

describe('ViewFormUserComponent', () => {
  let component: ViewFormUserComponent;
  let fixture: ComponentFixture<ViewFormUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFormUserComponent]
    });
    fixture = TestBed.createComponent(ViewFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
