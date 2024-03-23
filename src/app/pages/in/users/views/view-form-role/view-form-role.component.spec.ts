import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormRoleComponent } from './view-form-role.component';

describe('ViewFormRoleComponent', () => {
  let component: ViewFormRoleComponent;
  let fixture: ComponentFixture<ViewFormRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFormRoleComponent]
    });
    fixture = TestBed.createComponent(ViewFormRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
