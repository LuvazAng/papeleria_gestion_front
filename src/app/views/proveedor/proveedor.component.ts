import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorService } from '../../service/proveedor.service';
import { MatDialog } from '@angular/material/dialog';
import { Proveedor } from '../../model/proveedor';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { ProveedorModalComponent } from './proveedor-modal/proveedor-modal.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit {

  displayedColumns = [
    'idProveedor',
    'nombreProveedor',
    'telefono',
    'direccion',
    'opciones',
  ];
  dataSource: MatTableDataSource<Proveedor>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private proveedorService: ProveedorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.proveedorService.proveedorActualizar.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });

    this.proveedorService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }
  
  onEdit(proveedor?: Proveedor) {
    let provee = proveedor != null ? proveedor : new Proveedor();
    this.dialog.open(ProveedorModalComponent, {
      width: '500px',
      data: provee,
    });
    
  }


  onDelete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((estado) => {
      if (estado) {
        this.proveedorService.eliminar(id).subscribe(() => {
          this.proveedorService
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
