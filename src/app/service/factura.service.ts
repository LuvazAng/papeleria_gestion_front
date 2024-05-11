import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../model/factura';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private url: string = "http://localhost:8080/factura"
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Factura[]>(this.url);
  }

  registrar(factura: Factura) {
    return this.http.post(this.url, factura);
  }

  countRegister(): Observable<number> {
    return this.http.get<Factura[]>(this.url).pipe(
      map(facturas => facturas.length)
    )
  }

  obtenerVentasMes(): Observable<Factura[]> {
    return this.http.get<Factura[]>('http://localhost:8080/factura/ventas-mes');
  }

}
