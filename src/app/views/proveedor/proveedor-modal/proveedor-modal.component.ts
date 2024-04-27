import { Component, Inject, OnInit } from '@angular/core';
import { Proveedor } from '../../../model/proveedor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../../service/proveedor.service';

@Component({
  selector: 'app-proveedor-modal',
  templateUrl: './proveedor-modal.component.html',
  styleUrl: './proveedor-modal.component.css'
})
export class ProveedorModalComponent implements OnInit {

  proveedor: Proveedor;

  constructor(
    private dialogRef: MatDialogRef<ProveedorModalComponent>,
    private proveedorService: ProveedorService,
    @Inject(MAT_DIALOG_DATA) private data: Proveedor
  ) { }

  ngOnInit(): void {
    this.proveedor = new Proveedor();
    this.proveedor.idProvedor = this.data.idProvedor;
    this.proveedor.nombreProveedor = this.data.nombreProveedor;
    this.proveedor.telefonoProveedor = this.data.telefonoProveedor;
    this.proveedor.direccionProveedor = this.data.direccionProveedor;
  }

  itemSave() {
    if (this.proveedor != null && this.proveedor.idProvedor > 0) {
      this.proveedorService.editar(this.proveedor).subscribe(() => {
        return this.proveedorService.listar().subscribe(data => {
          this.proveedorService.proveedorActualizar.next(data);
        })
      });

    } else {
      this.proveedorService.registrar(this.proveedor).subscribe(() => {
        this.proveedorService.listar().subscribe(data => {
          this.proveedorService.proveedorActualizar.next(data);
        })
      })
    }
    this.itemClose()
  }

  itemClose() {
    this.dialogRef.close();
  }

}
