import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { reportesProvider } from '../Servicios/reportesProvider';
import { error } from 'console';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import Swal from 'sweetalert2';
Chart.register(...registerables);

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements AfterViewInit {
  reporte1: any = [];
  reporte3: any[] = [];
  chart1: Chart | null = null;
  chart2: Chart | null = null;
  chart3: Chart | null = null;
  chart4: Chart | null = null;
  mes: number;
  dia: string;
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  @ViewChild('chartCanvas2') chartCanvas2: ElementRef;
  @ViewChild('chartCanvas3') chartCanvas3: ElementRef;
  @ViewChild('chartCanvas4') chartCanvas4: ElementRef;
  constructor(private reportes: reportesProvider) {}

  ngAfterViewInit(): void {
    this.crearGrafico();
    this.crearGrafico4();
  }

  llamarAPI() {
    this.reportes.getReporte2(this.mes).subscribe(
      (data) => {
        console.log(data);
        if (data.totalTarjeta === 0 && data.totalEfectivo === 0) {
          // Lanzar alerta de SweetAlert indicando que el mes no tiene nada recaudado
          Swal.fire({
            title: 'Sin recaudación',
            text: 'El mes no tiene ninguna recaudación',
            icon: 'info',
          });
        } else {
          this.createChart(data.totalTarjeta, data.totalEfectivo);
        }
      },
      (error) => {
        console.error(error);
      }
    );
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
         responsive: true,
         maintainAspectRatio: false,
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
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      };
  
      const ctx = this.chartCanvas2.nativeElement.getContext('2d');
      if (this.chart2) {
        this.chart2.destroy();
      }
      this.chart2 = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
           responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      } as any);
    });
  }
  
  // crearGrafico3(): void {
  //   this.reportes.getReporte3(this.dia).subscribe((cantidadTurnos: number) => {
  //     const chartData = {
  //       labels: [this.dia],
  //       datasets: [
  //         {
  //           label: 'Cantidad de Turnos',
  //           data: [cantidadTurnos],
  //           backgroundColor: 'rgba(255, 159, 64, 0.2)',
  //           borderColor: 'rgba(255, 159, 64, 1)',
  //           borderWidth: 1,
  //         },
  //       ],
  //     };
  
  //     const ctx = this.chartCanvas3.nativeElement.getContext('2d');
  //     if (this.chart3) {
  //       this.chart3.destroy();
  //     }
  //     this.chart3 = new Chart(ctx, {
  //       type: 'doughnut',
  //       data: chartData,
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         scales: {
  //           y: {
  //             beginAtZero: true,
  //           },
  //         },
  //       },
  //     } as any);
  //   });
  // }
  
  crearGrafico4(): void {
    this.reportes.getReporte4().subscribe((data) => {
      console.log(data);
  
      const traducciones :any = {
        Monday: 'Lunes',
        Tuesday: 'Martes',
        Wednesday: 'Miércoles',
        Thursday: 'Jueves',
        Friday: 'Viernes',
        Saturday: 'Sábado',
        Sunday: 'Domingo'
      };
  
      const chartData = {
        labels: Object.keys(data).map((day) => traducciones[day]),
        datasets: [
          {
            label: 'Cantidad de Turnos',
            data: Object.values(data),
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      };
  
      const ctx = this.chartCanvas4.nativeElement.getContext('2d');
      if (this.chart4) {
        this.chart4.destroy();
      }
      this.chart4 = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      } as ChartConfiguration<'bar', number[], string>); // Especificar el tipo de configuración del gráfico
    });
  }
  
}
