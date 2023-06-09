import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend-Kineapp';
  constructor(private authService: AuthService) {}

  public cerrar(): void {
    this.authService.logout();
  }
}
