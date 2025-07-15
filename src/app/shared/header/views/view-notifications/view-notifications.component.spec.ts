import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotificationsComponent } from './view-notifications.component';

describe('ViewNotificationsComponent', () => {
  let component: ViewNotificationsComponent;
  let fixture: ComponentFixture<ViewNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNotificationsComponent]
    });
    fixture = TestBed.createComponent(ViewNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
