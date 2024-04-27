import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../service/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { ClienteModalComponent } from './cliente-modal/cliente-modal.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit{
  displayedColumns = [
    'idProducto',
    'nombreProducto',
    'descripcion',
    'precio',
    'stock',
    'fecha',
    'opciones',
  ];

  dataSource: MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.clienteService.clienteActualizar.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);

    });

    this.clienteService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);

    });
  }

  onEdit(cliente?: Cliente) {
    let client = cliente != null ? cliente : new Cliente();
    this.dialog.open(ClienteModalComponent, {
      width: '500px',
      data: client,
    });
  }

  onDelete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((estado) => {
      if (estado) {
        this.clienteService.eliminar(id).subscribe(() => {
          this.clienteService
            .listar()
            .subscribe(
              (data) => (this.dataSource = new MatTableDataSource(data))
            );
        });
      }
    });
  }
  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
}
