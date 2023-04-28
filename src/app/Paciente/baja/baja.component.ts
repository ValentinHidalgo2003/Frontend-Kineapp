import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PacienteProvider } from 'src/app/Servicios/pacienteServicio';

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
    const result: boolean = confirm(
      'Está seguro que desea borrar la orden?'
    );

    if (result) {
      this.subscription.add(
        this.pacienteProvider.eliminar(this.idPaciente).subscribe({
          next: () => {
            this.onEliminar.emit();
            console.log(this.idPaciente)
            alert('se borro correctamente')
          },
          error: () => {
            alert('error al borrar la orden');
          },
        })
      );
    }
  }
}
