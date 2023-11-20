import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormServiceComponent } from './view-form-service.component';

describe('ViewFormServiceComponent', () => {
  let component: ViewFormServiceComponent;
  let fixture: ComponentFixture<ViewFormServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFormServiceComponent]
    });
    fixture = TestBed.createComponent(ViewFormServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
