import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/Interfaces/Paciente';
import { obraSocialProvider } from 'src/app/Servicios/obraSocialProvider';
import { PacienteProvider } from 'src/app/Servicios/pacienteServicio';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  Pacientes : any = [];
  obraSocial : any = [];
  public modalAbierto = false;
  historialMedicoSeleccionado: any;
  private subscription = new Subscription();
  constructor(private pacienteProvider:PacienteProvider, private router: Router) { }
  
  ngOnInit(): void {
    this.pacienteProvider.getPacientes().subscribe(data => {this.Pacientes = data} )
  }


  abrirModal(historialMedico: any) {
    this.historialMedicoSeleccionado = historialMedico;
    this.modalAbierto = true;
  }

  
  actualizarListado() {
    this.pacienteProvider.getPacientes().subscribe(pacientes => {
      this.Pacientes = pacientes;
    });
  }

  actualizarArticulo(id: any) {
    this.router.navigate(['modificar', id]);
  }
  
}
