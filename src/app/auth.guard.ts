// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Permitir acceso a la ruta
    } else {
      this.router.navigate(['/']); // Redirigir al componente de inicio de sesión si el usuario no ha iniciado sesión
      return false; // No permitir acceso a la ruta
    }
  }
}
