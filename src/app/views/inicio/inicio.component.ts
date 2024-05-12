import { Component, OnInit } from '@angular/core';
import { Factura } from '../../model/factura';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaService } from '../../service/factura.service';
import { ProductoService } from '../../service/producto.service';
import { Producto } from '../../model/producto';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InicioModalComponent } from './inicio-modal/inicio-modal.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  totalVentasMes: number = 0;
  totalVentasAnual: number = 0;
  totalVentasDia: number = 0;
  productosBajoStock: Producto[] = [];

  displayedColumns = [
    'idVenta',
    'nombreCliente',
    'nombreUsuario',
    'total',
    'fecha'
  ];
  dataSourceMes: MatTableDataSource<Factura>;
  dataSourceTodas: MatTableDataSource<Factura>;
  dataSourceDia: MatTableDataSource<Factura>;

  constructor(
    private router: Router,
    private facturaService: FacturaService,
    private productoService: ProductoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarMes();
    this.listarTodas();
    this.listarDia();
    this.calcularTotalVentasDia();
    this.calcularTotalVentasMes();
    this.calcularTotalVentasAnual();
    this.obtenerProductosBajoStock();
  }

  listarMes() {
    this.facturaService.obtenerVentasMes().subscribe((data) => {
      this.dataSourceMes = new MatTableDataSource(data);
      this.dataSourceMes.filterPredicate = (data: Factura, filtro: string) => {
        return data.idCliente.nombreCliente.toLowerCase().includes(filtro);
      };
    });
  }

  listarTodas() {
    this.facturaService.listar().subscribe((data) => {
      this.dataSourceTodas = new MatTableDataSource(data);
      this.dataSourceTodas.filterPredicate = (data: Factura, filtro: string) => {
        return data.idCliente.nombreCliente.toLowerCase().includes(filtro);
      };
    });
  }

  listarDia() {
    this.facturaService.obtenerVentasDia().subscribe((data) => {
      this.dataSourceDia = new MatTableDataSource(data);
      this.dataSourceDia.filterPredicate = (data: Factura, filtro: string) => {
        return data.idCliente.nombreCliente.toLowerCase().includes(filtro);
      };
    });
  }

  filtrarMes(valor: string) {
    this.dataSourceMes.filter = valor.trim().toLowerCase();
  }

  filtrarTodas(valor: string) {
    this.dataSourceTodas.filter = valor.trim().toLowerCase();
  }

  filtrarDia(valor: string) {
    this.dataSourceDia.filter = valor.trim().toLowerCase();
  }

  calcularTotalVentasMes() {
    this.facturaService.obtenerVentasMes().subscribe((data) => {
      // Suma el total de todas las ventas del mes
      this.totalVentasMes = data.reduce((total, venta) => total + venta.totalVenta, 0);
      // Redondea el total a dos decimales
      this.totalVentasMes = parseFloat(this.totalVentasMes.toFixed(2));
    });
  }

  calcularTotalVentasAnual() {
    this.facturaService.listar().subscribe((data) => {
      // Suma el total de todas las ventas del mes
      this.totalVentasAnual = data.reduce((total, venta) => total + venta.totalVenta, 0);
      // Redondea el total a dos decimales
      this.totalVentasAnual = parseFloat(this.totalVentasAnual.toFixed(2));
    });
  }

  calcularTotalVentasDia() {
    this.facturaService.obtenerVentasDia().subscribe((data) => {
      // Suma el total de todas las ventas del mes
      this.totalVentasDia = data.reduce((total, venta) => total + venta.totalVenta, 0);
      // Redondea el total a dos decimales
      this.totalVentasDia = parseFloat(this.totalVentasDia.toFixed(2));
    });
  }

  obtenerProductosBajoStock() {
    this.productoService.obtenerProductoBajo().subscribe((data) => {
      this.productosBajoStock = data;
    });
  }

  verProducto(nombreProducto: string) {
    this.router.navigate(['/productos'], { queryParams: { nombre: nombreProducto } });
  }

  verHistorial(){
    this.dialog.open(InicioModalComponent,{
      width: '700px'
    })
  }


}
