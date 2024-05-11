import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      // Si el usuario no ha iniciado sesión, redirigir al componente de inicio de sesión
      this.authService.logout(); // Redirige a la ruta principal
    }
  }

  logout() {
    this.authService.logout();
  }

  title = 'papeleria-gestion-front';

  toggleSidebar(): void {
    const body: Element = document.querySelector('body')!;
    const sidebar: Element = body.querySelector('.sidebar')!;
    sidebar.classList.toggle('close');
  }
}
