import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IntModalWsp } from '../interfaces/int-modal-wsp';
import { ShiftsService } from '../pages/in/shifts/services/shifts.service';
import { DialogWspComponent } from '../shared/dialog-wsp/dialog-wsp.component';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor(
    private ShiftService : ShiftsService,
    private dialog: MatDialog,
    private ToastService: ToastService
    ) { }
  
  getModalWsp(data:any){
    const dialogRef = this.dialog.open(DialogWspComponent, {
      data:  { 
        cod_area: data?.cod_area,
         phone: data?.phone,
         name: data?.name,
         date_shift : data?.date_shift,
         service: data?.service
         } as IntModalWsp,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if(data)
        this.sendWsp(data);
     
    });
  }

  sendWsp(data:any){
    this.ShiftService.sendWspApi(data).then((data : any) => {
      this.ToastService.showToastNew('',  data?.message, 'success');
    }).catch(error => {
      this.ToastService.showToastNew('ERROR',  error?.error?.message, 'error');
    })
  }
}
