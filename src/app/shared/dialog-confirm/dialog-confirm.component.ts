
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = DialogConfirmComponent
  ) { }

  price = this.data?.shift?.price;
  description = this.data?.shift?.description;


  onClose(confirm: Boolean) {
    this.dialogRef.close({ confirm: confirm, price: this.price , description : this.description})
  }
}
