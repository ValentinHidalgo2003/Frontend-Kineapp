import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GetComponent } from './Paciente/get/get.component';
import { PostComponent } from './Paciente/post/post.component';
import { PacienteProvider } from './Servicios/pacienteServicio';
import { HttpClientModule } from '@angular/common/http';
import { obraSocialProvider } from './Servicios/obraSocialProvider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GetComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
     AppRoutingModule,
     HttpClientModule,
     FormsModule,
     ReactiveFormsModule
    ],
  providers: [PacienteProvider,obraSocialProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
