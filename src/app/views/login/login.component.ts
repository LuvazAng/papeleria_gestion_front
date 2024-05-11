import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correoUsuario: string = "";
  contrasenaUsuario: string = "";
  mensajeError: string | null = null;
  usuarioAutenticado: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router,
    private authService: AuthService
  ) { }

  iniciarSesion() {
    this.usuarioService.login(this.correoUsuario, this.contrasenaUsuario)
      .subscribe(
        (usuario) => {
          console.log("Usuario inició sesión:", usuario);
          this.authService.login();
          // Redirigir al usuario a la página principal
          this.router.navigateByUrl('/inicio');
        },
        (error) => {
          console.error("Error al iniciar sesión:", error);
          this.mensajeError = "Error al iniciar sesión. Por favor, verifica tus credenciales.";
          this.usuarioAutenticado = false;
        }
      );
  }
}
