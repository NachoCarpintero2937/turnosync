import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWspComponent } from './dialog-wsp.component';

describe('DialogWspComponent', () => {
  let component: DialogWspComponent;
  let fixture: ComponentFixture<DialogWspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogWspComponent]
    });
    fixture = TestBed.createComponent(DialogWspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
