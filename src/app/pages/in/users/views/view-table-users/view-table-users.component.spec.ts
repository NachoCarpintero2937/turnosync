import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTableUsersComponent } from './view-table-users.component';

describe('ViewTableUsersComponent', () => {
  let component: ViewTableUsersComponent;
  let fixture: ComponentFixture<ViewTableUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTableUsersComponent]
    });
    fixture = TestBed.createComponent(ViewTableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
