import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Paciente } from '../Interfaces/Paciente';
import { url } from 'inspector';

@Injectable()
export class kinesiologoProvider {
  private _options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    }),
  };
  apiUrlBase: string = environment.urlBaseApi;
  constructor(private http: HttpClient) {}

  getKinesiologos(): Observable<any> {
    const url = this.apiUrlBase + 'api/Kinesiologo/Get';
    return this.http.get(url, this._options);
  }
}
