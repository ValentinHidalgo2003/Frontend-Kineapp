import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PacienteProvider } from '../Servicios/pacienteServicio';
import { AuthService } from '../auth.service';

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
            alert('Sesion iniciada correctamente');
            this.formulario.reset();
            console.log(data);
            this.authservice.setToken(data.token)
          },
          error: (error) => {
            alert('Usuario o contraseña incorrecta');
            console.log(error);
            if(this.authservice.isLoggedIn())
            this.formulario.reset();
          },
        })
      );
    }
  }
}
