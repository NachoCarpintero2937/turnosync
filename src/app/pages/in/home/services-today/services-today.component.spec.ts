import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTodayComponent } from './services-today.component';

describe('ServicesTodayComponent', () => {
  let component: ServicesTodayComponent;
  let fixture: ComponentFixture<ServicesTodayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesTodayComponent]
    });
    fixture = TestBed.createComponent(ServicesTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
