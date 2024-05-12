import { Component, OnInit } from '@angular/core';
import { Factura } from '../../../model/factura';
import { FacturaService } from '../../../service/factura.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inicio-modal',
  templateUrl: './inicio-modal.component.html',
  styleUrl: './inicio-modal.component.css'
})
export class InicioModalComponent implements OnInit {

  displayedColumns = [
    'idVenta',
    'nombreCliente',
    'nombreUsuario',
    'total',
    'fecha'
  ];
  dataSourceTodas: MatTableDataSource<Factura>;

  constructor(private facturaService: FacturaService,) { }
  ngOnInit(): void {
    this.listarTodas();
  }

  filtrarTodas(valor: string) {
    this.dataSourceTodas.filter = valor.trim().toLowerCase();
  }

  listarTodas() {
    this.facturaService.listar().subscribe((data) => {
      this.dataSourceTodas = new MatTableDataSource(data);
      this.dataSourceTodas.filterPredicate = (data: Factura, filtro: string) => {
        return data.idCliente.nombreCliente.toLowerCase().includes(filtro);
      };
    });
  }

}
