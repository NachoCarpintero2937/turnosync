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
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
@Input() shifts:any;
@Output() shiftEvent = new EventEmitter();
constructor(
   private dialog: MatDialog,
   private DatePipe: DatePipe,
   private DiaryService: DiaryService,
   private ToastService: ToastService,
   private ModalService:ModalService) {}

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
  const dataWsp = {
   cod_area: shift?.client?.cod_area,
   phone : shift?.client?.phone,
   name : shift?.client?.name,
   date_shift : shift?.date_shift,
   service : shift?.service?.name
  }
   this.ModalService.getModalWsp(dataWsp);
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
