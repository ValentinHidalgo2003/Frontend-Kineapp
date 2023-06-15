import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private idRol: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  apiUrlBase: string = environment.urlBaseApi;
  private _options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    }),
  };
  constructor(private http: HttpClient, private cookies: CookieService) {}

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }
  public setLoggedIn(value: boolean): void {
    this.isLoggedIn$.next(value);
  }

  public login(usuario: any): Observable<any> {
    const Url = this.apiUrlBase + 'api/Login/loguear';
    const body = JSON.stringify(usuario);
  
    return this.http.post<any>(Url, body, this._options).pipe(
      map(response => {
        if (response) {
          this.setLoggedIn(true);
          this.setIdRol(response.idRol);
          console.log("rol ", this.getIdRol())
        } else {
          this.setLoggedIn(false);
        }
        return response;
      })
    );
  }
  public getIdRol(): Observable<number> {
    return this.idRol.asObservable();
  }

  public setIdRol(idRol: number): void {
    this.idRol.next(idRol);
  }

  public logout(): void {
    this.setLoggedIn(false);
    alert('sesion cerrada')
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  
  getToken() {
    return this.cookies.get("token");
  }
}
