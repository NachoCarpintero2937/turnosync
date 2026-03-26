import { Component, OnInit } from '@angular/core';
import { CajaService } from './services/caja.service';
import { LoginService } from '../../public/login/services/login.service';

@Component({
    selector: 'app-caja',
    templateUrl: './caja.component.html',
    styleUrls: ['./caja.component.scss'],
    standalone: false
})
export class CajaComponent implements OnInit {
  report: any = null;
  entries: any[] = [];
  loading = false;

  meses = this.CajaService.getMeses();
  currentDate = new Date();
  selectedMes = this.currentDate.getMonth() + 1;
  selectedAnio = this.currentDate.getFullYear();

  userId = this.LoginService.getDataUser()?.data?.id;

  constructor(
    private CajaService: CajaService,
    private LoginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    Promise.all([
      this.CajaService.getReport(this.selectedMes, this.selectedAnio),
      this.CajaService.getEntries(
        this.userId,
        this.selectedMes,
        this.selectedAnio,
      ),
    ])
      .then(([reportRes, entriesRes]: any[]) => {
        this.report = reportRes?.data;
        this.entries = entriesRes?.data?.entries ?? [];
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  onMesChange(mes: number) {
    this.selectedMes = mes;
    this.load();
  }

  get mesNombre(): string {
    return this.meses[this.selectedMes - 1];
  }

  get totalIngresos(): number {
    return this.entries
      .filter((e) => e.tipo === 'ingreso')
      .reduce((s, e) => s + +e.monto, 0);
  }

  get totalEgresos(): number {
    return this.entries
      .filter((e) => e.tipo === 'egreso')
      .reduce((s, e) => s + +e.monto, 0);
  }

  get sueldoEstimado(): number {
    return (
      (this.report?.total_mes ?? 0) + this.totalIngresos - this.totalEgresos
    );
  }

  onEntryAdded() {
    this.CajaService.getEntries(
      this.userId,
      this.selectedMes,
      this.selectedAnio,
    ).then((res: any) => {
      this.entries = res?.data?.entries ?? [];
    });
  }
}
