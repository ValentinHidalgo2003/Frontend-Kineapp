import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Paciente } from '../Interfaces/Paciente';

@Injectable()
export class PacienteProvider {
  private _options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    }),
  };
  apiUrlBase: string = environment.urlBaseApi;
  constructor(private http: HttpClient) {}
  
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.log("Error: " + error.message)
        }
        else {
            console.log("Status Code: " + error.status)
        }
        return throwError(() => new Error((error.error)));
    }
 

  getPacientes(): Observable<any> {
    const url = this.apiUrlBase + 'api/Paciente/Get';
    return  this.http.get(url, this._options);
  }
  

  getPersonaById(id: any): Observable<any> {
    try {
      const url = this.apiUrlBase + "api/Paciente/" + id;
      return this.http.get(url, this._options);
      //const headers = { 'Content-Type': 'application/json' };
      // return this.http.get(url, {'headers': headers});
    } catch (error:any) {
      return this.handleError(error);
    }
  }

  putPersona(
    id: any,
    Nombre: string,
    Apellido: string,
    Dni: string,
    FechaNacimiento: Date,
    Sexo: boolean,
    Email: string,
    Telefono: string,
    Antecedentes: string
  ): Observable<any> {
    try {
      const comando = {
        id: id,
        Nombre: Nombre,
        Apellido: Apellido,
        Dni: Dni,
        FechaNacimiento: FechaNacimiento,
        Sexo: Sexo,
        Email: Email,
        Telefono: Telefono,
        Antecedentes: Antecedentes,
      };
      const url = this.apiUrlBase + "api/Paciente/Put/{id}";
      //const headers = { 'Content-Type': 'application/json' };
      const body = JSON.stringify(comando);
      //return this.http.put(url, body, {'headers': headers});
      return this.http.put(url, body, this._options);
    } catch (error:any) {
      return this.handleError(error);
    }
  }

  eliminar(id: any): Observable<any> {
    const url = this.apiUrlBase + "api/Paciente/Delete/" + id;
    return this.http.delete(url);
  }

  create(
    id: any,
    Nombre: string,
    Apellido: string,
    Dni: string,
    FechaNacimiento: Date,
    Sexo: boolean,
    Email: string,
    Telefono: string,
    Antecedentes: string
  ): Observable<any> {
    try {
      const comando = {
        id: id,
        Nombre: Nombre,
        Apellido: Apellido,
        Dni: Dni,
        FechaNacimiento: FechaNacimiento,
        Sexo: Sexo,
        Email: Email,
        Telefono: Telefono,
        Antecedentes: Antecedentes,
      };
      const Url = this.apiUrlBase + "api/Paciente/Post";
      //const headers = {'content-type':'application/json'}
      const body = JSON.stringify(comando);
      console.log(body);
      return this.http.post(Url, body, this._options);
    } catch (error:any) {
      return this.handleError(error);
    }
  }
}
