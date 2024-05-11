import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioActualizar = new Subject<Usuario[]>();
  private url: string = "http://localhost:8080/usuarios"
  private loginUrl: string = "http://localhost:8080/usuarios/login";

  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get<Usuario[]>(this.url);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  editar(usuario: Usuario) {
    return this.http.put(this.url, usuario);
  }
  registrar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }
  login(correoUsuario: string, contrasenaUsuario: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { correoUsuario, contrasenaUsuario });
  }
}
