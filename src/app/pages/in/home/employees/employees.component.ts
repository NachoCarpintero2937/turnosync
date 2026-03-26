import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    standalone: false
})
export class EmployeesComponent {
  @Input() shifts: any;
  @Output() shiftEvent = new EventEmitter();
  @Output() checked = new EventEmitter();
  constructor(


  ) { }




} 
