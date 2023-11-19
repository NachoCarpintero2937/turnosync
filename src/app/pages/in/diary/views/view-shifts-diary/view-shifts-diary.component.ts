import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogWspComponent } from 'src/app/shared/dialog-wsp/dialog-wsp.component';

@Component({
  selector: 'app-view-shifts-diary',
  templateUrl: './view-shifts-diary.component.html',
  styleUrls: ['./view-shifts-diary.component.scss']
})
export class ViewShiftsDiaryComponent {
@Input() shifts: any;

constructor(
  private DatePipe: DatePipe,
  private dialog: MatDialog
  ){

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
    if(data)
    this.goToWsp(data);
  });
}

goToWsp(data:any){
  const url = 'https://api.whatsapp.com/send'
  const phone = `?phone=54${data?.shift?.client?.phone}`;
  const message = `&text=${data?.message}`;
  window.open(
    url + phone + message
  );

}
}
