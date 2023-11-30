import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnumStatusShift } from 'src/app/enums/shiftStatus.enum';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { DialogWspComponent } from 'src/app/shared/dialog-wsp/dialog-wsp.component';

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
  private dialog: MatDialog,
  private EnviromentService : EnviromentService
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
  const dialogRef = this.dialog.open(DialogWspComponent, {
    data: { shift: shift },
    width: '50%',
  });
  dialogRef.afterClosed().subscribe((data) => {
    if(data){
      const dataToWsp = {
        cod_area : data?.shift?.client?.cod_area,
        phone : data?.shift?.client?.phone,
        message : data?.message
      }
      this.EnviromentService.goToWsp(dataToWsp);
    }
  });
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
