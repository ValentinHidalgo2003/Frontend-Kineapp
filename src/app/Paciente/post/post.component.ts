import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistorialMedico } from 'src/app/Interfaces/HistorialMedico';
import { Paciente } from 'src/app/Interfaces/Paciente';
import { obraSocial } from 'src/app/Interfaces/obraSocial';
import { obraSocialProvider } from 'src/app/Servicios/obraSocialProvider';
import { PacienteProvider } from 'src/app/Servicios/pacienteServicio';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  formulario: FormGroup;
  paciente: Paciente;
  historial: HistorialMedico[];
  obrasSociales: any=[];

  private subscripcion = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pacienteProvider: PacienteProvider,
    private obrasocialProvider: obraSocialProvider,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
        Nombre: [, [Validators.required, Validators.maxLength(150)]],
        Apellido: [, [Validators.required, Validators.maxLength(1000)]],
        Dni: [, Validators.minLength(8)],
        fechaNacimento: [],
        sexo: [, Validators.required],
        email: [, Validators.email],
        telefono: [],
        antecedentes: [],
        idHistorialMedico: [],
        IdObraSocial:['',Validators.required],
        IdTurno:[],
        
      historialMedico: this.formBuilder.group({
        fechaCreacion: [],
        descripcion: [],
        nota: [],
      }),
      usuario : this.formBuilder.group({
        nombreUsuario : [,Validators.required],
        password : [,Validators.required]
      })
    });
    this.obrasocialProvider.getObraSocial().subscribe(data => {this.obrasSociales = data} )
  }

  guardar() {
    if (this.formulario.valid) {
      const paciente = {
        nombre: this.formulario.value.Nombre,
        apellido: this.formulario.value.Apellido,
        dni: this.formulario.value.Dni,
        fechaNacimento: this.formulario.value.fechaNacimento,
        sexo: this.formulario.value.sexo,
        email: this.formulario.value.email,
        telefono: this.formulario.value.telefono,
        antecedentes: this.formulario.value.antecedentes,
        idObraSocial: this.formulario.value.IdObraSocial,
        idTurno: this.formulario.value.IdTurno,
        idUsuario: this.formulario.value.IdUsuario,
         historialMedico : {
          fechaCreacion: this.formulario.value.historialMedico.fechaCreacion,
          descripcion: this.formulario.value.historialMedico.descripcion,
          nota: this.formulario.value.historialMedico.nota
        },
        usuario : {
          nombreUsuario : this.formulario.value.usuario.nombreUsuario,
          password : this.formulario.value.usuario.password,
          idRol: 1
        }
      };

      this.subscripcion.add(
        this.pacienteProvider.agregar(paciente).subscribe({
          next: (data) => {
            this.router.navigate(['home']);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se registro correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.formulario.reset();
            // this.authservice.setToken(data.token);
            this.authservice.setLoggedIn(true);
          },
          error: (error) => {
            alert('error al guardar');
            console.log(error);
          },
        })
      );
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Te faltan campos por completar!',
        timer: 2000
      })
    }
  }
  
  navegarGet() {
    this.router.navigate(['consultar']);
  }
}
