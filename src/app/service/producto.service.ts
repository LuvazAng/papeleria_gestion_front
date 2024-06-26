import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoActualizar = new Subject<Producto[]>();
  private url: string = "http://localhost:8080/productos"
  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get<Producto[]>(this.url);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  editar(producto: Producto) {
    return this.http.put(this.url, producto);
  }
  registrar(producto: Producto) {
    return this.http.post(this.url, producto);
  }
  listarID(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }
  editarPatch(producto: Producto): Observable<any> {
    return this.http.patch(`${this.url}/${producto.idProducto}`, producto);
  }
  obtenerProductoBajo() {
    return this.http.get<Producto[]>('http://localhost:8080/productos/bajo-stock')
  }
}
