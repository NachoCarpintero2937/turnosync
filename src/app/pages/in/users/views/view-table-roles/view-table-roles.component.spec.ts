import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTableRolesComponent } from './view-table-roles.component';

describe('ViewTableRolesComponent', () => {
  let component: ViewTableRolesComponent;
  let fixture: ComponentFixture<ViewTableRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTableRolesComponent]
    });
    fixture = TestBed.createComponent(ViewTableRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
