import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';
import { DiaryService } from '../../diary/services/diary.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  @Input() shifts: any;
  @Output() shiftEvent = new EventEmitter();
  constructor(
    

 ) { }




} 
