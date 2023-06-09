import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetalleTurno } from 'src/app/Interfaces/DetalleTurno';
import { Turno } from 'src/app/Interfaces/Turno';
import { kinesiologoProvider } from 'src/app/Servicios/kinesiologoProvider';
import { obraSocialProvider } from 'src/app/Servicios/obraSocialProvider';
import { PacienteProvider } from 'src/app/Servicios/pacienteServicio';
import { tipoTratamientoProvider } from 'src/app/Servicios/tiposTratamientoProvider';
import { TurnoProvider } from 'src/app/Servicios/turnoProvider';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostTurnoComponent implements OnInit {
  formulario: FormGroup;
  turno: Turno;
  detalleTurno: DetalleTurno;
  obrasSociales: any;
  kinesiologos: any = [];
  pacientes: any = [];
  tipoTratamiento: any = [];

  private subscripcion = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private turnoprovider: TurnoProvider,
    private obrasocialProvider: obraSocialProvider,
    private kinesologoProvider: kinesiologoProvider,
    private pacienteProvider : PacienteProvider,
    private tipotratamientoProvider: tipoTratamientoProvider
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      detalleTurno: this.formBuilder.group({
        fecha: [, Validators.required],
        horaInicio: [],
        horaFin: [],
        precio: [],
        idObraSocial: [, Validators.required],
        idKinesiologo: [],
        idMedioPago: [],
        idPaciente : [,Validators.required],
        tratamiento: this.formBuilder.group({
          idTipoTratamiento: [, Validators.required],
          fechaInicio: [],
          fechaFin: [],
          objetivo: [],
        }),
      }),
    });
    this.obrasocialProvider.getObraSocial().subscribe((data) => {
      this.obrasSociales = data;
    });
    this.pacienteProvider.getPacientes().subscribe((data) => {
      this.pacientes = data;
    });
    this.kinesologoProvider.getKinesiologos().subscribe((data) => {
      this.kinesiologos = data;
    });
    this.tipotratamientoProvider.getTipoTratamientos().subscribe((data) => {
      this.tipoTratamiento = data;
    });
    console.log(this.kinesiologos)
  }

  guardar() {
    if (this.formulario.valid) {
      const horaInicio = this.formulario.value.detalleTurno.horaInicio + ":00";
      const horaFin = this.formulario.value.detalleTurno.horaFin + ":00";
      
      const turno = {
        detalleTurno: {
          fecha: this.formulario.value.detalleTurno.fecha,
          horaInicio: horaInicio,
          horaFin: horaFin,
          precio: this.formulario.value.detalleTurno.precio,
          idObraSocial: this.formulario.value.detalleTurno.idObraSocial,
          idKinesiologo: this.formulario.value.detalleTurno.idKinesiologo,
          idPaciente: this.formulario.value.detalleTurno.idPaciente,
          idMedioPago: this.formulario.value.detalleTurno.idMedioPago,
          tratamiento: {
            idTipoTratamiento: this.formulario.value.detalleTurno.tratamiento.idTipoTratamiento,
            fechaInicio: this.formulario.value.detalleTurno.tratamiento.fechaInicio,
            fechaFin: this.formulario.value.detalleTurno.tratamiento.fechaFin,
            objetivo: this.formulario.value.detalleTurno.tratamiento.objetivo
          }
        },
      };
  
      this.subscripcion.add(
        this.turnoprovider.agregar(turno).subscribe({
          next: () => {
            console.log(turno)
            this.router.navigate(['consultarTurno']);
            alert('Se guardo correctamente');
            this.formulario.reset();
          },
          error: (error) => {
            alert('error al guardar');
            console.log(turno);
            console.log(error);
          },
        })
      );
    }
  }
  

  navegarGet() {
    this.router.navigate(['consultarTurno']);
  }
}
