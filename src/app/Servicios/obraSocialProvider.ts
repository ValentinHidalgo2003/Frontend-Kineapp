import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable } from 'rxjs';

@Injectable()
export class obraSocialProvider {
  private _options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    }),
  };
  apiUrlBase: string = environment.urlBaseApi;
  constructor(private http: HttpClient) {}


  getObraSocial(): Observable<any> {
    const url = this.apiUrlBase + 'api/obraSocial/Get';
    return  this.http.get(url, this._options);
  }
}
