import { Component,Input,Output,EventEmitter } from '@angular/core';
import { HomeService } from '../services/home.service';
import { DialogWspComponent } from 'src/app/shared/dialog-wsp/dialog-wsp.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { UrlService } from 'src/app/services/url.service';
import { ClipboardService } from 'ngx-clipboard';
import { DiaryService } from '../../diary/services/diary.service';
import { LoginService } from 'src/app/pages/public/login/services/login.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
@Input() shifts:any;
@Output() shiftEvent = new EventEmitter();
constructor(
  private HomeService: HomeService,
   private dialog: MatDialog,
   private DatePipe: DatePipe,
   private Router : Router,
   private DiaryService: DiaryService,
   private ToastService: ToastService,
   private EnviromentService: EnviromentService,
   private LoginService : LoginService,
   private UrlService : UrlService,
   private ClipboardService: ClipboardService) {}

   submitStatus! : boolean;
goChangeStatus(data:any,status:any){
  if(!this.submitStatus){
    this.submitStatus = true;
    const dataStatus = {
      id : data?.id,
      status: status
    }
    this.DiaryService.setStatus(dataStatus).then((shift) =>{
      this.submitStatus = false;
      this.ToastService.showToastNew(
        '',
        "Turno " + (status== 1 ? 'confirmado' : 'cancelado') + ' correctamente',
        'success'
      );
    this.shiftEvent.emit(true)
    }).catch((e:any) =>{

    })
  }
}

changeStatus(shift:any,status:any) {
const dialogRef = this.dialog.open(DialogConfirmComponent, {
  data: { client: shift?.client.name, status:status },
  width: '20%',
});
dialogRef.afterClosed().subscribe((data) => {
  if(data){
   this.goChangeStatus(shift,status);
  }
});
}

sendWsp(shift: any) {
  const dialogRef = this.dialog.open(DialogWspComponent, {
    data: { shift: shift },
    width: '50%',
  });
  dialogRef.afterClosed().subscribe((data: any) => {
    if(data){
      const dataToWsp = {
        cod_area : data?.shift?.client?.cod_area,
        phone : data?.shift?.client?.phone,
        message : data?.message
      }
      this.EnviromentService.goToWsp(dataToWsp);
    };
  });
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
} 
