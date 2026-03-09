import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CajaService } from '../../services/caja.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-caja-manual',
  templateUrl: './view-caja-manual.component.html',
  styleUrls: ['./view-caja-manual.component.scss'],
})
export class ViewCajaManualComponent implements OnChanges {
  @Input() entries: any[] = [];
  @Input() userId!: number;
  @Input() mes!: number;
  @Input() anio!: number;
  @Output() entryAdded = new EventEmitter<void>();

  submitting = false;
  today = new Date().toISOString().split('T')[0];

  form = this.fb.group({
    tipo: ['ingreso', Validators.required],
    concepto: ['', Validators.required],
    monto: ['', Validators.required],
    fecha: [this.today, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public CajaService: CajaService,
    private ToastService: ToastService,
  ) {}

  ngOnChanges(): void {}

  formatMonto(event: any) {
    const raw = event.target.value;
    const fmt = this.CajaService.formatInput(raw);
    this.form.get('monto')?.setValue(fmt, { emitEvent: false });
    event.target.value = fmt;
  }

  submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    const raw = this.form.getRawValue();
    const data = {
      user_id: this.userId,
      tipo: raw.tipo,
      concepto: raw.concepto,
      monto: this.CajaService.parseARS(raw.monto ?? ''),
      fecha: raw.fecha,
    };
    this.CajaService.createEntry(data)
      .then(() => {
        this.ToastService.showToastNew('', 'Movimiento registrado', 'success');
        this.form.patchValue({ concepto: '', monto: '' });
        this.submitting = false;
        this.entryAdded.emit();
      })
      .catch(() => {
        this.submitting = false;
      });
  }

  deleteEntry(id: number) {
    this.CajaService.deleteEntry(id).then(() => {
      this.ToastService.showToastNew('', 'Movimiento eliminado', 'success');
      this.entryAdded.emit();
    });
  }

  get ingresos() {
    return this.entries.filter((e) => e.tipo === 'ingreso');
  }
  get egresos() {
    return this.entries.filter((e) => e.tipo === 'egreso');
  }
}
