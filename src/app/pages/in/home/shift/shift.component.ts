import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';
import { DiaryService } from '../../diary/services/diary.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'dy-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {
  @Input() employe: any;
  @Input() edit: boolean = true;
  @Output() checked = new EventEmitter();
  constructor(
    private ModalService: ModalService,
    private dialog: MatDialog,
    private DatePipe: DatePipe,
    private DiaryService: DiaryService,
    private ToastService: ToastService) { }

  submitStatus!: boolean;
  @Output() shiftEvent = new EventEmitter();

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

  changeStatus(shift: any, status: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { shift: shift, status: status },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data?.confirm) {
        this.goChangeStatus(shift, status, data?.price, data?.description);
      }
    });
  }

  goChangeStatus(data: any, status: any, price: any, description: any) {
    if (!this.submitStatus) {
      this.submitStatus = true;
      const dataStatus = {
        id: data?.id,
        status: status,
        price: price,
        description: description
      }
      this.DiaryService.setStatus(dataStatus).then((shift) => {
        this.submitStatus = false;
        this.ToastService.showToastNew(
          '',
          "Turno " + (status == 1 ? 'confirmado' : 'cancelado') + ' correctamente',
          'success'
        );
        this.shiftEvent.emit(true);
      }).catch((e: any) => {

      })
    }
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

  checkbokShift(checked: boolean, shift: any) {
    this.checked.emit({ checked: checked, shifts: shift })
  }
}
