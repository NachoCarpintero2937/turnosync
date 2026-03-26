import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftsService } from '../../pages/in/shifts/services/shifts.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
  standalone: false,
})
export class DialogConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = DialogConfirmComponent,
    private ShiftsService: ShiftsService,
  ) {}

  price = this.data?.shift?.price;
  description = this.data?.shift?.description;
  payment_method = this.data?.shift?.payment_method || null;

  ngOnInit(): void {
    if (this.price) {
      this.formatPrice();
    }
  }

  formatPrice() {
    if (this.price) {
      this.price = this.ShiftsService.formatInput(this.price.toString());
    }
  }

  onClose(confirm: Boolean) {
    let rawPrice = this.price;
    if (rawPrice && typeof rawPrice === 'string') {
      rawPrice = rawPrice.replace(/\./g, '');
    }

    this.dialogRef.close({
      confirm: confirm,
      price: rawPrice,
      description: this.description,
      payment_method: this.payment_method,
    });
  }
}
