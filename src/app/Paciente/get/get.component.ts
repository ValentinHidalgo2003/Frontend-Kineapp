import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteProvider } from 'src/app/Servicios/pacienteServicio';


@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  Pacientes : any = [];
  constructor(private pacienteProvider:PacienteProvider) { }
  
  ngOnInit(): void {
    this.pacienteProvider.getPacientes().subscribe(data => {this.Pacientes = data} )
  }
}
