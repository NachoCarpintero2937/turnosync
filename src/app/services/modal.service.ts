import { Injectable } from '@angular/core';
import { DialogWspComponent } from '../shared/dialog-wsp/dialog-wsp.component';
import { EnviromentService } from './enviroment.service';
import { MatDialog } from '@angular/material/dialog';
import { IntModalWsp } from '../interfaces/int-modal-wsp';
@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor(
    private EnviromentService : EnviromentService,
    private dialog: MatDialog
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
      console.log(data)
      if(data)
        this.EnviromentService.goToWsp(data);
     
    });
  }
}
