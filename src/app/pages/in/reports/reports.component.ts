import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ReportsService } from './services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild('barChartPrices', { static: false }) barChartPrices: any;
  @ViewChild('barChartCancelled', { static: false }) barChartCancelled: any;
  @ViewChild('lineChartYear', { static: false }) lineChartYear: any;

  // Filtro de Año
  selectedYear: number = new Date().getFullYear();
  availableYears: number[] = [
    this.selectedYear - 2,
    this.selectedYear - 1,
    this.selectedYear,
  ];

  // Instancias guardadas de Chart para poder destruirlas y recrearlas al refrescar
  chartPricesInstance: any = null;
  chartCancelledInstance: any = null;
  chartYearInstance: any = null;

  dataChart: any;
  loading: boolean = false;

  // AI Analysis State
  analyzing: boolean = false;
  aiAnalysisResponse: string = '';
  historicalDataPayload: any = null;

  constructor(private ReportsService: ReportsService) {}

  ngOnInit(): void {
    // Rellenamos años disponibles, por si la app lleva más años, podemos expandir esto o leerlo del backend.
    this.getReports();
  }

  getReports() {
    this.loading = true;
    this.aiAnalysisResponse = ''; // Reset analysis on fetch
    this.historicalDataPayload = null;

    this.ReportsService.getReports({ year: this.selectedYear })
      .then((reports: any) => {
        this.initChartByPrice(reports?.data?.totalPrices);
        this.initChartByCancelled(reports?.data?.cancelled_shifts);
        this.initChartYear(reports?.data?.totalYears);
        this.historicalDataPayload = reports?.data?.totalYears;
        this.loading = false;
      })
      .catch((e) => {
        this.loading = false;
        console.error(e);
      });
  }

  onYearChange() {
    this.getReports();
  }

  analyzeWithAI() {
    if (
      !this.historicalDataPayload ||
      Object.keys(this.historicalDataPayload).length === 0
    )
      return;

    this.analyzing = true;
    this.aiAnalysisResponse = '';

    this.ReportsService.analyzeReports(this.historicalDataPayload)
      .then((res: any) => {
        if (res?.data?.analysis) {
          this.aiAnalysisResponse = res.data.analysis;
        }
        this.analyzing = false;
      })
      .catch((e: any) => {
        console.error('Error in AI Analysis:', e);
        this.analyzing = false;
      });
  }

  initChartByPrice(monthsPrices: any) {
    if (!monthsPrices) return;
    const ctx = this.barChartPrices.nativeElement;

    if (this.chartPricesInstance) {
      this.chartPricesInstance.destroy();
    }
    const data = {
      labels: Object.keys(monthsPrices),
      datasets: [
        {
          label: 'Ingresos Mensuales AR$',
          data: Object.values(monthsPrices),
          fill: true,
          backgroundColor: 'rgba(74, 144, 226, 0.7)', // Premium Blue
          borderColor: '#4a90e2',
          borderWidth: 1,
          borderRadius: 6, // Bar rounding
          hoverBackgroundColor: 'rgba(74, 144, 226, 0.9)',
        },
      ],
    };

    this.chartPricesInstance = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                let value = context.parsed.y || 0;
                return '$' + value.toLocaleString('es-AR');
              },
            },
          },
        },
        scales: {
          y: { grid: { display: true, color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } },
        },
      },
    });
  }

  initChartByCancelled(cancelledShifts: any) {
    if (!cancelledShifts) return;
    const ctx = this.barChartCancelled.nativeElement;

    if (this.chartCancelledInstance) {
      this.chartCancelledInstance.destroy();
    }
    const data = {
      labels: Object.keys(cancelledShifts),
      datasets: [
        {
          label: 'Turnos Cancelados',
          data: Object.values(cancelledShifts),
          fill: true,
          backgroundColor: 'rgba(231, 76, 60, 0.7)', // Premium Red/Coral
          borderColor: '#e74c3c',
          borderWidth: 1,
          borderRadius: 6,
          hoverBackgroundColor: 'rgba(231, 76, 60, 0.9)',
        },
      ],
    };

    this.chartCancelledInstance = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            grid: { display: true, color: 'rgba(0,0,0,0.05)' },
            ticks: { stepSize: 1 },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  initChartYear(totalYears: any) {
    if (!totalYears) return;
    const ctx = this.lineChartYear.nativeElement;

    if (this.chartYearInstance) {
      this.chartYearInstance.destroy();
    }
    const data = {
      labels: Object.keys(totalYears),
      datasets: [
        {
          label: 'Recaudación Histórica',
          data: Object.values(totalYears),
          fill: true,
          tension: 0.4, // Smooth curve
          backgroundColor: 'rgba(155, 89, 182, 0.15)', // Light purple fill
          borderColor: '#9b59b6', // Deep purple border
          borderWidth: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#9b59b6',
          pointHoverBackgroundColor: '#9b59b6',
          pointHoverBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };

    this.chartYearInstance = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                let value = context.parsed.y || 0;
                return '$' + value.toLocaleString('es-AR');
              },
            },
          },
        },
        scales: {
          y: { grid: { display: true, color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } },
        },
      },
    });
  }
}
