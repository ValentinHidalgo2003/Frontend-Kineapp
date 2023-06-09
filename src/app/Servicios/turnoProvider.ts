import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';


@Injectable()
export class TurnoProvider {
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
 

  getTurnos(): Observable<any> {
    const url = this.apiUrlBase + 'api/Turno/Get';
    return  this.http.get(url, this._options);
  }
  

//   getTurnoById(id: any): Observable<any> {
//     try {
//       const url = this.apiUrlBase + "api/Paciente/" + id;
//       return this.http.get(url, this._options);
//       //const headers = { 'Content-Type': 'application/json' };
//       // return this.http.get(url, {'headers': headers});
//     } catch (error:any) {
//       return this.handleError(error);
//     }
//   }

  eliminar(id: number): Observable<any> {
    const url = this.apiUrlBase + "api/Turno/Delete/" + id;
    return this.http.delete(url);
  }

//   modificar(paciente: any): Observable<any> {
//     console.log(paciente);
//     const url = this.apiUrlBase + "api/Paciente/Put/" + paciente.IdPaciente;
//     return this.http.put<any>(url, paciente);
//   }  
  
  agregar(turno: any): Observable<any>{
    const Url = this.apiUrlBase + "api/Turno/Post";
    const body = JSON.stringify(turno);
    console.log(body);
    return this.http.post<any>(Url,body,this._options)
  }

  getTurnosPorFecha(fecha: any): Observable<any> {
    const url = `${this.apiUrlBase}api/Turno/GetTurnosPorFecha/${fecha}`;
    return this.http.get(url, this._options);
  }
  
}
