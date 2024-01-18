import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ReportsService } from './services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild('barChartPrices', { static: false }) barChartPrices: any;
  @ViewChild('barChartCancelled', { static: false }) barChartCancelled: any;
  @ViewChild('lineChartYear', { static: false }) lineChartYear: any;
  dataChart: any;
  constructor(
    private ReportsService: ReportsService
  ) { }
  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.ReportsService.getReports().then((reports: any) => {
      this.initChartByPrice(reports?.data?.totalPrices);
      this.initChartByCancelled(reports?.data?.cancelled_shifts);
      this.initChartYear(reports?.data?.totalYears)
    }).catch(e => {
      console.error(e);
    });
  }

  initChartByPrice(monthsPrices: any) {
    const ctx = this.barChartPrices.nativeElement
    const data = {
      labels:  Object.keys(monthsPrices),
      datasets: [{
        label: 'Total Mensual',
        data:  Object.values(monthsPrices),
        fill: false,
        tooltip: '$',
        tension: 0.1,
        backgroundColor: [
          '#7cce5d'
        ]
      }]
    }
      // Si el gráfico no existe, crea uno nuevo
      this.barChartPrices = new Chart(ctx, {
        type: 'bar',
        data
      });
    }

    initChartByCancelled(cancelledShifts:any){
      const ctx = this.barChartCancelled.nativeElement
      const data = {
        labels:  Object.keys(cancelledShifts),
        datasets: [{
          label: 'Cantidad mensual',
          data:  Object.values(cancelledShifts),
          fill: false,
          tension: 0.1,
          backgroundColor: [
            "#c53333",
          ]
        }]
      }
        // Si el gráfico no existe, crea uno nuevo
        this.barChartCancelled = new Chart(ctx, {
          type: 'bar',
          data
        });
      }

      initChartYear(totalYears:any){
        const ctx = this.lineChartYear.nativeElement
        const data = {
          labels:  Object.keys(totalYears),
          datasets: [{
            label: 'Total por año',
            data:  Object.values(totalYears),
            fill: false,
            tension: 0.1,
            backgroundColor: [
              "#cc99cd",
            ]
          }]
        }
          // Si el gráfico no existe, crea uno nuevo
          this.lineChartYear = new Chart(ctx, {
            type: 'line',
            data
          });
        }
      }


