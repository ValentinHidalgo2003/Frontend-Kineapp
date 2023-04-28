import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './Paciente/post/post.component';
import { GetComponent } from './Paciente/get/get.component';
import { PutComponent } from './put/put.component';

const routes: Routes = [
  //{ path: '**', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: PostComponent },
  { path: 'consultar', component: GetComponent },
  { path: 'modificar/:id', component: PutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
