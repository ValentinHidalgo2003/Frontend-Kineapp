import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Frontend-Kineapp';
  idRol: Observable<number>;
  isLoggedIn: boolean;
  constructor(
    private authService: AuthService,
    private guard: AuthGuard
    // private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit() {
    this.idRol = this.authService.getIdRol();
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      console.log("logueado =", this.isLoggedIn);
    });
  }

  public cerrar(): void {
    this.authService.logout();
  }

  // private getIdRolFromToken(token: string): number {
  //   const decodedToken = this.jwtHelperService.decodeToken(token);
  //   return decodedToken.IdRol;
  // }
}
