import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsBirthdayComponent } from './clients-birthday.component';

describe('ClientsBirthdayComponent', () => {
  let component: ClientsBirthdayComponent;
  let fixture: ComponentFixture<ClientsBirthdayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsBirthdayComponent]
    });
    fixture = TestBed.createComponent(ClientsBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
