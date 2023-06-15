import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  private subscripcion = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombreUsuario: [,Validators.required],
      password: [,Validators.required],
    });
  }

   guardar() {
    if (this.formulario.valid) {
      const paciente = {
       nombreUsuario : this.formulario.value.nombreUsuario,
       password : this.formulario.value.password
      };

      this.subscripcion.add(
        this.authservice.login(paciente).subscribe({
          next: (data) => {
            this.router.navigate(['home']);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Sesion iniciada Correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.formulario.reset();
            console.log(data);
            //this.authservice.setToken(data.token)
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario o Contraseña incorrecta!',
            })
            if(this.authservice.isLoggedIn())
            this.formulario.reset();
          },
        })
      );
    }
  }
}
