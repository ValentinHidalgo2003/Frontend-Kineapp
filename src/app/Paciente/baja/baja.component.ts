import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PacienteProvider } from 'src/app/Servicios/pacienteServicio';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.css']
})
export class BajaComponent implements OnDestroy {
  @Input() idPaciente: any;
  @Output() onEliminar = new EventEmitter();
  private subscription = new Subscription();
  constructor(private pacienteProvider : PacienteProvider) { }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminar() {
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
        Swal.fire(
          'Eliminado!',
          'El paciente fue borrado.',
          'success'
        )
        this.subscription.add(
          this.pacienteProvider.eliminar(this.idPaciente).subscribe({
            next: () => {
              this.onEliminar.emit();
            },
            error: () => {
              alert('error al borrar');
            },
          })
        );
      }
    })
    
  }
}
