import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Paciente } from '../Interfaces/Paciente';
import { url } from 'inspector';

@Injectable()
export class tipoTratamientoProvider {
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
 

  getTipoTratamientos(): Observable<any> {
    const url = this.apiUrlBase + 'api/TipoTratamiento/Get';
    return  this.http.get(url, this._options);
  }
}
