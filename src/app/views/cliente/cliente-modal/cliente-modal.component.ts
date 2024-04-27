import { Component, Inject, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/cliente.service';
import { Cliente } from '../../../model/cliente';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrl: './cliente-modal.component.css'
})
export class ClienteModalComponent implements OnInit {

  cliente: Cliente;

  constructor(
    private dialogRef: MatDialogRef<ClienteModalComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) private data: Cliente
  ) { }

  ngOnInit(): void {
    this.cliente = new Cliente()
    this.cliente.idCliente = this.data.idCliente;
    this.cliente.nombreCliente = this.data.nombreCliente;
    this.cliente.apellPaterno = this.data.apellPaterno;
    this.cliente.apellMaterno = this.data.apellMaterno;
    this.cliente.telefonoCliente = this.data.telefonoCliente;
    if (this.cliente.fechaCliente = this.data.fechaCliente) {
      this.cliente.fechaCliente = this.data.fechaCliente;
    } else {
      this.cliente.fechaCliente = new Date().toISOString().slice(0, 10);
    }
  }

  itemSave() {
    if (this.cliente != null && this.cliente.idCliente > 0) {
      this.clienteService.editar(this.cliente).subscribe(() => {
        return this.clienteService.listar().subscribe(data => {
          this.clienteService.clienteActualizar.next(data);
        })
      });

    } else {
      this.clienteService.registrar(this.cliente).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.clienteActualizar.next(data);
        })
      })
    }
    this.itemClose()
  }

  itemClose() {
    this.dialogRef.close();
  }

}
