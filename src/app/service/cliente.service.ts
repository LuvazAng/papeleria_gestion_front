import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  clienteActualizar = new Subject<Cliente[]>();
  private url: string = "http://localhost:8080/clientes"
  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get<Cliente[]>(this.url);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  editar(cliente: Cliente) {
    return this.http.put(this.url, cliente);
  }
  registrar(cliente: Cliente) {
    return this.http.post(this.url, cliente);
  }
}
