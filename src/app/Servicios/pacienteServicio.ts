import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Paciente } from '../Interfaces/Paciente';
import { url } from 'inspector';

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

  eliminar(id: any): Observable<any> {
    const url = this.apiUrlBase + "api/Paciente/Delete/" + id;
    return this.http.delete(url);
  }

  modificar(paciente: any): Observable<any> {
    console.log(paciente);
    const url = this.apiUrlBase + "api/Paciente/Put/" + paciente.IdPaciente;
    return this.http.put<any>(url, paciente);
  }  
  
  agregar(paciente: Paciente): Observable<any>{
    const Url = this.apiUrlBase + "api/Paciente/Post";
    const body = JSON.stringify(paciente);
    console.log(body);
    return this.http.post<any>(Url,body,this._options)
  }


}
