import { Component, Input } from '@angular/core';
import { CajaService } from '../../services/caja.service';

@Component({
    selector: 'app-view-caja-semanas',
    templateUrl: './view-caja-semanas.component.html',
    styleUrls: ['./view-caja-semanas.component.scss'],
    standalone: false
})
export class ViewCajaSemanasComponent {
  @Input() semanas: any[] = [];
  expandedSemana: number | null = null;

  constructor(public CajaService: CajaService) {}

  toggle(sem: number) {
    this.expandedSemana = this.expandedSemana === sem ? null : sem;
  }
}
