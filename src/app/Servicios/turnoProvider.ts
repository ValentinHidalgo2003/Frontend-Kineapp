import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


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
  

  getTurnos(): Observable<any> {
    const url = this.apiUrlBase + 'api/Turno/Get';
    return  this.http.get(url, this._options);
  }


  eliminar(id: number): Observable<any> {
    const url = this.apiUrlBase + "api/Turno/Delete/" + id;
    return this.http.delete(url);
  }
  
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
