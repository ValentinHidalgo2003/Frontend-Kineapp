import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Paciente } from '../Interfaces/Paciente';
import { url } from 'inspector';
import { ReporteCobros } from '../Interfaces/reporteCobro';

@Injectable()
export class reportesProvider {
  private _options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    }),
  };
  apiUrlBase: string = environment.urlBaseApi;
  constructor(private http: HttpClient) {}

  getReporte(): Observable<any> {
    const url = this.apiUrlBase + 'api/Reporte/PacientesPorObraSocial';
    return this.http.get(url, this._options);
  }

  getReporte2(mes: number): Observable<any> {
    const url = `${this.apiUrlBase}api/Reporte/Mes/${mes}`;
    return this.http.get(url, this._options);
  }

  getReporte3(dia: string): Observable<any>{
    const url = `${this.apiUrlBase}api/Reporte/TurnosAtendidos/${dia}`;
    return this.http.get(url,this._options)
  }

  getReporte4(): Observable<any>  {
   const url = this.apiUrlBase + 'api/Reporte/TurnosXSemana';
    return this.http.get(url, this._options);
  }
  
}