import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn1: boolean = false;
  apiUrlBase: string = environment.urlBaseApi;
  private _options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    }),
  };
  constructor(private http: HttpClient, private cookies: CookieService) {}

  public isLoggedIn(): boolean {
    return this.isLoggedIn1;
  }

  public login(usuario: any): Observable<any> {
    const Url = this.apiUrlBase + 'api/Login/loguear';
    const body = JSON.stringify(usuario);
  
    return this.http.post<any>(Url, body, this._options).pipe(
      map(response => {
        if (response && response.token) {
          this.isLoggedIn1 = true;
        } else {
          this.isLoggedIn1 = false;
        }
        return response;
      })
    );
  }

  public logout(): void {
    this.isLoggedIn1 = false;
    alert('sesion cerrada')
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  
  getToken() {
    return this.cookies.get("token");
  }
}
