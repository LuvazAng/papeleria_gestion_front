import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  proveedorActualizar = new Subject<Proveedor[]>();
  private url: string = "http://localhost:8080/proveedores"


  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Proveedor[]>(this.url);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  editar(proveedor: Proveedor) {
    return this.http.put(this.url, proveedor);
  }

  registrar(proveedor: Proveedor) {
    return this.http.post(this.url, proveedor);
  }
}
