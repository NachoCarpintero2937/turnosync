import { Component, Input } from '@angular/core';
import { CajaService } from '../../services/caja.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-caja-ia',
  templateUrl: './view-caja-ia.component.html',
  styleUrls: ['./view-caja-ia.component.scss'],
})
export class ViewCajaIaComponent {
  @Input() report: any;
  @Input() totalIngresos = 0;
  @Input() totalEgresos = 0;
  @Input() sueldoEstimado = 0;
  @Input() mesNombre = '';

  analysis = '';
  loading = false;

  constructor(
    private CajaService: CajaService,
    private ToastService: ToastService,
  ) {}

  analyze() {
    if (!this.report) return;
    this.loading = true;
    this.analysis = '';

    const payload = {
      total_mes: this.report.total_mes,
      total_efectivo: this.report.total_efectivo,
      total_transferencia: this.report.total_transferencia,
      total_ingresos: this.totalIngresos,
      total_egresos: this.totalEgresos,
      sueldo_estimado: this.sueldoEstimado,
      semanas: this.report.semanas,
      mes_nombre: this.mesNombre,
    };

    this.CajaService.analyze(payload)
      .then((res: any) => {
        this.analysis =
          res?.data?.analysis ?? 'No se pudo obtener el análisis.';
        this.loading = false;
      })
      .catch(() => {
        this.ToastService.showToastNew(
          '',
          'Error al conectar con la IA',
          'error',
        );
        this.loading = false;
      });
  }
}
