import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GetComponent } from './Paciente/get/get.component';
import { PostComponent } from './Paciente/post/post.component';
import { PacienteProvider } from './Servicios/pacienteServicio';
import { HttpClientModule } from '@angular/common/http';
import { obraSocialProvider } from './Servicios/obraSocialProvider';
import { BajaComponent } from './Paciente/baja/baja.component';
import { PutComponent } from './Paciente/put/put.component';
import { CommonModule } from '@angular/common';
import { GetTurnoComponent } from './Turnos/get/get.component';
import { TurnoProvider } from './Servicios/turnoProvider';
import { PostTurnoComponent } from './Turnos/post/post.component';
import { kinesiologoProvider } from './Servicios/kinesiologoProvider';
import { tipoTratamientoProvider } from './Servicios/tiposTratamientoProvider';
import { CookieService } from 'ngx-cookie-service';
import { reportesProvider } from './Servicios/reportesProvider';
import { ReportesComponent } from './reportes/reportes.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GetComponent,
    PostComponent,
    BajaComponent,
    PutComponent,
    GetTurnoComponent,
    PostTurnoComponent,
    ReportesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  providers: [
    PacienteProvider,
    obraSocialProvider,
    TurnoProvider,
    kinesiologoProvider,
    tipoTratamientoProvider,
    CookieService,
    reportesProvider,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
