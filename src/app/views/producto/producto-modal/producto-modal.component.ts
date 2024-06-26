import { Component, Inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../service/producto.service';
import { Producto } from '../../../model/producto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrl: './producto-modal.component.css'
})
export class ProductoModalComponent implements OnInit {

  producto: Producto;

  nombreProductoControl = new FormControl('', Validators.required);
  descripcionProductoControl = new FormControl('', Validators.required);
  precioProductoControl = new FormControl('', Validators.required);
  stockProductoControl = new FormControl('', Validators.required);

  constructor(
    private dialogRef: MatDialogRef<ProductoModalComponent>,
    private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) private data: Producto
  ) { }

  ngOnInit(): void {
    this.producto = new Producto();
    this.producto.idProducto = this.data.idProducto;
    this.producto.nombreProducto = this.data.nombreProducto;
    this.producto.descripcion = this.data.descripcion;
    this.producto.precioUnitario = this.data.precioUnitario;
    this.producto.stock = this.data.stock;
    if (this.producto.fechaProducto = this.data.fechaProducto) {
      this.producto.fechaProducto = this.data.fechaProducto;
    } else {
      this.producto.fechaProducto = this.obtenerFechaFormateada()
    }
  }

  obtenerFechaFormateada() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Agrega cero inicial si es necesario
    const day = String(today.getDate()).padStart(2, '0'); // Agrega cero inicial si es necesario
    return `${year}-${month}-${day}`;
  }

  itemSave() {
    if (this.producto != null && this.producto.idProducto > 0) {
      this.productoService.editar(this.producto).subscribe(() => {
        return this.productoService.listar().subscribe(data => {
          this.productoService.productoActualizar.next(data);
        })
      });

    } else {
      this.productoService.registrar(this.producto).subscribe(() => {
        this.productoService.listar().subscribe(data => {
          this.productoService.productoActualizar.next(data);
        })
      })
    }
    this.itemClose()
  }

  itemClose() {
    this.dialogRef.close();
  }
}
