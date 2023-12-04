import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';
import { DiaryService } from '../../diary/services/diary.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  @Input() shifts: any;
  @Output() shiftEvent = new EventEmitter();
  constructor(
    private dialog: MatDialog,
    private DatePipe: DatePipe,
    private DiaryService: DiaryService,
    private ToastService: ToastService,
    private ModalService: ModalService) { }

  submitStatus!: boolean;
  goChangeStatus(data: any, status: any, price: any) {
    if (!this.submitStatus) {
      this.submitStatus = true;
      const dataStatus = {
        id: data?.id,
        status: status,
        price: price
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

  changeStatus(shift: any, status: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { shift: shift, status: status },
      width: '20%',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.goChangeStatus(shift, status, data?.price);
      }
    });
  }

  sendWsp(shift: any) {
    const dataWsp = {
      cod_area: shift?.client?.cod_area,
      phone: shift?.client?.phone,
      name: shift?.client?.name,
      date_shift: shift?.date_shift,
      service: shift?.service?.name
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
