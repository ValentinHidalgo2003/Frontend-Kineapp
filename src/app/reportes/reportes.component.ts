import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { reportesProvider } from '../Servicios/reportesProvider';
import { error } from 'console';
import { Chart, ChartType, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements AfterViewInit {
  reporte1: any = [];
  chart1: Chart | null = null;
  chart2: Chart | null = null;
  mes: number;
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  @ViewChild('chartCanvas2') chartCanvas2: ElementRef;
  constructor(private reportes: reportesProvider) {}

  ngAfterViewInit(): void {
    this.crearGrafico();
  }

  llamarAPI() {
    this.reportes.getReporte2(this.mes).subscribe((data) => {
      console.log(this.mes)
      this.createChart(data.totalTarjeta, data.totalEfectivo);
    });
  }

  createChart(totalTarjeta: number, totalEfectivo: number): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (this.chart1) {
      this.chart1.destroy();
    }
    this.chart1 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tarjeta', 'Efectivo'],
        datasets: [
          {
            label: 'Cobros por tipo de pago',
            data: [totalTarjeta, totalEfectivo],
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  crearGrafico(): void {
    this.reportes.getReporte().subscribe((data) => {
      console.log(data);
      const chartData = {
        labels: data.map((item: any) => item.nombreObraSocial),
        datasets: [
          {
            label: 'Cantidad de Pacientes',
            data: data.map((item: any) => item.cantidadPacientes),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      };

      const ctx = this.chartCanvas2.nativeElement.getContext('2d');
      if (this.chart2) {
        this.chart2.destroy();
      }
      this.chart2 = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }
}
