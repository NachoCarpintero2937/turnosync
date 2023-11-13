import { DOCUMENT, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-wsp',
  templateUrl: './dialog-wsp.component.html',
  styleUrls: ['./dialog-wsp.component.scss'],
})
export class DialogWspComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogWspComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = DialogWspComponent,
    private DatePipe: DatePipe
  ) {}
  notif: string = '';
  ngOnInit(): void {
    console.log(this.data);
  }

  setValueNotif() {
    this.notif =
      'Hola ' +
      this.data?.shift?.client?.name +
      ', queríamos recordarte que el día ' +
      this.DatePipe.transform(this.data?.shift?.date_shift, 'dd/MM/yyyy') +
      ' a las ' +
      this.DatePipe.transform(this.data?.shift?.date_shift, 'HH:mm') +
      ' tenes turno para ' +
      this.data?.shift?.service?.name +
      '. Por favor confirmar asistencia. Te deseamos que tengas un hermoso día 💗.';
  }
}
