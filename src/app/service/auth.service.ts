import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) { }
  login() {
    // Lógica de inicio de sesión (llamada al servicio de usuarios)
    // Si el inicio de sesión es exitoso, establece loggedIn en true
    this.loggedIn.next(true);
  }

  logout() {
    // Lógica de cierre de sesión (si es necesario)
    this.loggedIn.next(false);
    // Redirigir al usuario al componente de inicio de sesión
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.loggedIn.value;
  }
}
