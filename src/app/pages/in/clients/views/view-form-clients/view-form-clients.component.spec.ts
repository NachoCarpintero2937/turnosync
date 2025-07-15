import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormClientsComponent } from './view-form-clients.component';

describe('ViewFormClientsComponent', () => {
  let component: ViewFormClientsComponent;
  let fixture: ComponentFixture<ViewFormClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFormClientsComponent]
    });
    fixture = TestBed.createComponent(ViewFormClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
