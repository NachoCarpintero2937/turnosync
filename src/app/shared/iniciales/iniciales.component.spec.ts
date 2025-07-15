import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialesComponent } from './iniciales.component';

describe('InicialesComponent', () => {
  let component: InicialesComponent;
  let fixture: ComponentFixture<InicialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicialesComponent]
    });
    fixture = TestBed.createComponent(InicialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
