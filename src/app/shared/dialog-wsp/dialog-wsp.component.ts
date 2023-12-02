import {  DatePipe } from '@angular/common';
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
  }

  setValueNotif() {
    this.notif =
      'Hola ' +
      this.data?.name +
      ', queríamos recordarte que el día ' +
      this.DatePipe.transform(this.data?.date_shift, 'dd/MM/yyyy') +
      ' a las ' +
      this.DatePipe.transform(this.data?.date_shift, 'HH:mm') +
      ' tenes turno para ' +
      this.data?.service +
      '. Por favor confirmar asistencia. Te deseamos que tengas un hermoso día 💗.';
  }

send(){
    this.dialogRef.close({
      data: this.data,
      message: this.notif
    })
  }

  onClose(){
    this.dialogRef.close();
  }
}
