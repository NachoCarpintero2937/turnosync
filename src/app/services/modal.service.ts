import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IntModalWsp } from '../interfaces/int-modal-wsp';
import { ShiftsService } from '../pages/in/shifts/services/shifts.service';
import { DialogWspComponent } from '../shared/dialog-wsp/dialog-wsp.component';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private ShiftService: ShiftsService,
    private dialog: MatDialog,
    private ToastService: ToastService,
  ) {}

  getModalWsp(data: any) {
    const dialogRef = this.dialog.open(DialogWspComponent, {
      data: {
        cod_area: data?.cod_area,
        phone: data?.phone,
        name: data?.name,
        date_shift: data?.date_shift,
        service: data?.service,
      } as IntModalWsp,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) this.sendWsp(data);
    });
  }

  sendWsp(data: any) {
    const phone = (data?.data?.cod_area || '') + (data?.data?.phone || '');
    const message = encodeURIComponent(data?.message || '');
    if (phone && message) {
      const url = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;
      window.open(url, '_blank');
    } else {
      this.ToastService.showToastNew(
        'ERROR',
        'Datos de contacto insuficientes',
        'error',
      );
    }
  }
}
