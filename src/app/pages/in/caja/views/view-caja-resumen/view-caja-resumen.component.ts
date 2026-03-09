import { Component, Input } from '@angular/core';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'app-view-caja-resumen',
  templateUrl: './view-caja-resumen.component.html',
  styleUrls: ['./view-caja-resumen.component.scss'],
})
export class ViewCajaResumenComponent {
  @Input() report: any;
  @Input() totalIngresos = 0;
  @Input() totalEgresos = 0;
  @Input() sueldoEstimado = 0;

  constructor(public CajaService: CajaService) {}
}
