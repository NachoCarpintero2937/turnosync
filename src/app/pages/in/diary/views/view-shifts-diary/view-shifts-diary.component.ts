import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnumStatusShift } from 'src/app/enums/shiftStatus.enum';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-view-shifts-diary',
  templateUrl: './view-shifts-diary.component.html',
  styleUrls: ['./view-shifts-diary.component.scss']
})
export class ViewShiftsDiaryComponent  {
@Input() shifts: any;
@Input() date!: Date;
@Input() loading!: Boolean;
@Output() outDate = new EventEmitter;
@Output() status = new EventEmitter;
enumShift!: EnumStatusShift
constructor(
  private DatePipe: DatePipe,
  private ModalService: ModalService
  ){

}
showPanel = false;
month = new Date();
getMonthName(): string {
  return this.DatePipe.transform(this.date ?this.date :  this.month, 'MMMM', 'es') +' '+ this.DatePipe.transform(this.date ?this.date :  this.month, 'YYYY');
}
getTootlip(shift: any) {
  const tooltip =
    shift?.service?.name +
    ' a ' +
    shift?.client?.name +
    ' el día ' +
    this.DatePipe.transform(shift?.date_shift, 'dd/MM/yyyy') +
    ' a las ' +
    this.DatePipe.transform(shift?.date_shift, 'HH:mm');
  return tooltip;
}


sendWsp(shift: any) {
 const dataWsp = {
  cod_area: shift?.client?.cod_area,
  phone : shift?.client?.phone,
  name : shift?.client?.name,
  date_shift : shift?.date_shift,
  service : shift?.service?.name
 }
  this.ModalService.getModalWsp(dataWsp);
}

filterDate(){
  this.outDate.emit(this.date);
}


changeStatus(data:any, status: any){
    this.status.emit({
      shift: data,
      status : status
    });
}
}
