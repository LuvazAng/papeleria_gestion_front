import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { Producto } from '../../model/producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProductoModalComponent } from './producto-modal/producto-modal.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  displayedColumns = [
    'idProducto',
    'nombreProducto',
    'descripcion',
    'precio',
    'stock',
    'fecha',
    'opciones',
  ];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.productoService.productoActualizar.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });

    this.productoService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  toggleSidebar(): void {
    const body: Element = document.querySelector('body')!;
    const sidebar: Element = body.querySelector('.sidebar')!;
    sidebar.classList.toggle('close');
  }

  onEdit(producto?: Producto) {
    let produc = producto != null ? producto : new Producto();
    this.dialog.open(ProductoModalComponent, {
      width: '500px',
      data: produc,
    });
    
  }

  onDelete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((estado) => {
      if (estado) {
        this.productoService.eliminar(id).subscribe(() => {
          this.productoService
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
