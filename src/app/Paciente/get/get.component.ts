import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private pacienteProvider:PacienteProvider) { }
  
  ngOnInit(): void {
    this.pacienteProvider.getPacientes().subscribe(data => {this.Pacientes = data} )
  }


  abrirModal(historialMedico: any) {
    this.historialMedicoSeleccionado = historialMedico;
    this.modalAbierto = true;
  }
}
