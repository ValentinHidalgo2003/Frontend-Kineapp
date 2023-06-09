import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { TurnoProvider } from 'src/app/Servicios/turnoProvider';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetTurnoComponent implements OnInit {

  Turnos : any = [];
  DetalleTurno : any = [];
  public modalAbierto = false;
  detalleTurnoSeleccionado: any;
  fechaFiltro: any = '';
  private subscription = new Subscription();
  constructor(private turnoProvider:TurnoProvider, private router: Router, private datePipe : DatePipe) { }
  
  ngOnInit(): void {
    this.obtener();
  }

obtener(){
  this.turnoProvider.getTurnos().subscribe(data => {this.Turnos = data} )
}

  eliminar(id:number) {
    const result: boolean = confirm(
      'Está seguro que desea borrar la orden?'
    );

    if (result) {
      this.subscription.add(
        this.turnoProvider.eliminar(id).subscribe({
          next: () => {
            alert('se borro correctamente')
            this.obtener();
          },
          error: (error) => {
            alert('error al borrar la orden');
            console.log(error);
          },
        })
      );
    }
  }

  filtrarPorFecha() {
    const fechaFormateada = this.datePipe.transform(this.fechaFiltro, 'yyyy-MM-dd');
    console.log(fechaFormateada)
    this.turnoProvider.getTurnosPorFecha(fechaFormateada).subscribe(data => {
      this.Turnos = data;
    });
  }
  
  abrirModal(detalleTurno: any) {
    this.detalleTurnoSeleccionado = detalleTurno;
    this.modalAbierto = true;
  }

}
