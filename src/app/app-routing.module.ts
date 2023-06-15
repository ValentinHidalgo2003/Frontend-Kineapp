import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './Paciente/post/post.component';
import { GetComponent } from './Paciente/get/get.component';
import { GetTurnoComponent } from './Turnos/get/get.component';
import { PutComponent } from './Paciente/put/put.component';
import { PostTurnoComponent } from './Turnos/post/post.component';
import { AuthGuard } from './auth.guard';
import { reportesProvider } from './Servicios/reportesProvider';
import { ReportesComponent } from './reportes/reportes.component';
import { TycComponent } from './Info/tyc/tyc.component';
import { PreguntasComponent } from './Info/preguntas/preguntas.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: PostComponent},
  { path: 'tyc', component: TycComponent},
  { path: 'preguntas', component: PreguntasComponent},
  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard]},
  { path: 'consultar', component: GetComponent, canActivate: [AuthGuard] },
  { path: 'modificar/:id', component: PutComponent, canActivate: [AuthGuard] },
  { path: 'consultarTurno', component: GetTurnoComponent, canActivate: [AuthGuard] },
  { path: 'registrarTurno', component: PostTurnoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
