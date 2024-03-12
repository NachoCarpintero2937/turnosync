
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArgentinePesoPipe } from 'src/app/pipes/argentinepeso.pipe';


@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = DialogConfirmComponent,
    private ArgentinePesoPipe: ArgentinePesoPipe
  ) { }

  price =  this.ArgentinePesoPipe.transform(this.data?.shift?.price).replace('$', '').replace(',00', "");
  description = this.data?.shift?.description;


  formatInput(event: any) {
    let value = event.target.value;
    value = this.ArgentinePesoPipe.transform(value);
    this.price = value.replace('$', '').replace(',00', "");
  }

  onClose(confirm: Boolean) {
    this.dialogRef.close({ confirm: confirm, price: this.price , description : this.description})
  }
}
