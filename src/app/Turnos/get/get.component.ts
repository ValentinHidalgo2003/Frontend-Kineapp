import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { TurnoProvider } from 'src/app/Servicios/turnoProvider';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'
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

  exportarDatos(): void {
    // Realiza la solicitud a tu API para obtener los datos a exportar
    this.turnoProvider.getTurnos().subscribe(data => {
      // Transforma los datos a un formato compatible con XLSX
      const datosExcel = this.transformarDatos(data);
  
      // Crea una hoja de trabajo en Excel
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
  
      // Agrega la hoja de trabajo al libro
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Turnos');
  
      // Genera el archivo Excel
      const fechaActual = new Date().toISOString().slice(0, 10); // Obtiene la fecha actual
      const nombreArchivo = `turnos_${fechaActual}.xlsx`;
      XLSX.writeFile(workbook, nombreArchivo);
    });
  }
  

  transformarDatos(data: any[]): any[] {
    const datosTransformados = [];
  
    console.log(data)
    for (const turno of data) {
      const datosTurno = {
        Fecha: turno.detalleTurno?.fecha,
        Horario: `${turno.detalleTurno?.horaInicio} - ${turno.detalleTurno?.horaFin}`,
        Tratamiento: turno.detalleTurno?.tratamiento?.objetivo,
        'Medio de Pago': turno.detalleTurno?.medioPago?.tipoMedioPago ? 'Efectivo' : 'Tarjeta',
        'Obra Social': turno.detalleTurno?.obraSocial?.descripcion,
        Precio : turno.detalleTurno?.precio
      };
  
      datosTransformados.push(datosTurno);
    }
  
    return datosTransformados;
  }
  

obtener(){
  this.turnoProvider.getTurnos().subscribe(data => {this.Turnos = data} )
}

  eliminar(id:number) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.turnoProvider.eliminar(id).subscribe({
            next: () => {
              Swal.fire(
                'Eliminado!',
                'El paciente fue borrado.',
                'success'
              )
              this.obtener();
            },
            error: (error) => {
              alert('error al borrar la orden');
              console.log(error);
            },
          })
        );
       
      }
    })
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
