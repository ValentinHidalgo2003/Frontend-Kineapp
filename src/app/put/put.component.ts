import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Paciente } from '../Interfaces/Paciente';
import { Subscription } from 'rxjs';
import { obraSocialProvider } from '../Servicios/obraSocialProvider';
import { PacienteProvider } from '../Servicios/pacienteServicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { obraSocial } from '../Interfaces/obraSocial';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-put',
  templateUrl: './put.component.html',
  styleUrls: ['./put.component.css'],
})
export class PutComponent implements OnInit, OnDestroy {
  @Input() paciente: Paciente;
  formulario: FormGroup;
  obrasSociales: any = [];
  private subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pacienteProvider: PacienteProvider,
    private obrasocialProvider: obraSocialProvider
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      Nombre: [, Validators.maxLength(150)],
      Apellido: [, Validators.maxLength(1000)],
      Dni: [, Validators.minLength(8)],
      fechaNacimento: [],
      sexo: [],
      email: [, Validators.email],
      telefono: [],
      antecedentes: [],
      idHistorialMedico: [],
      IdObraSocial: ['', Validators.required],
      IdTurno: [],
      IdUsuario: [],
      historialMedico: this.formBuilder.group({
        fechaCreacion: [],
        descripcion: [],
        nota: [],
      }),
    });
    this.obrasocialProvider.getObraSocial().subscribe((data) => {
      this.obrasSociales = data;
    });
    this.cargarArticulo();
  }

  private cargarArticulo() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          
          this.pacienteProvider.getPersonaById(id).subscribe({
            next: (respuesta: Paciente) => {
              this.paciente = respuesta;
              this.paciente.IdPaciente = id;
              //console.log(this.paciente.IdPaciente)
            },
            error: () => {
              alert('error al obtener el paciente');
            },
          });
        },
      })
    );
  }
  //IdObraSocial: this.formulario.value.IdObraSocial,

  guardar() {
    if (this.formulario.valid) {
      const paciente = {
        IdPaciente: this.paciente.IdPaciente,
        Nombre: this.formulario.value.Nombre,
        Apellido: this.formulario.value.Apellido,
        Dni: this.formulario.value.Dni,
        FechaNacimento: this.formulario.value.fechaNacimento,
        Sexo: this.formulario.value.sexo,
        Email: this.formulario.value.email,
        Telefono: this.formulario.value.telefono,
        Antecedentes: this.formulario.value.antecedentes,
        idObraSocial: this.formulario.value.IdObraSocial,
        HistorialMedico: {
          fechaCreacion: this.formulario.value.historialMedico.fechaCreacion,
          descripcion: this.formulario.value.historialMedico.descripcion,
          nota: this.formulario.value.historialMedico.nota
        },
      };
      
      this.subscription.add(
        this.pacienteProvider.modificar(paciente).subscribe({
          next: () => {
            this.router.navigate(['consultar']);
            alert('Se actualizó correctamente');
            this.formulario.reset();
          },
          error: (error) => {
            alert('Error al actualizar');
            console.log(paciente);
            console.log(error);
          },
        })
      );
    }
  }
  

  cancelar() {
    this.router.navigate(['listado']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
