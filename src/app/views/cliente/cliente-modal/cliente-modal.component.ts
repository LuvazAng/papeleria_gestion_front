import { Component, Inject, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/cliente.service';
import { Cliente } from '../../../model/cliente';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrl: './cliente-modal.component.css'
})
export class ClienteModalComponent implements OnInit {

  cliente: Cliente;

  nombreClienteControl = new FormControl('', Validators.required);
  apellPClienteControl = new FormControl('', Validators.required);
  apellMClienteControl = new FormControl('', Validators.required);
  telefonoClienteControl = new FormControl('', Validators.required);

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
      this.cliente.fechaCliente = this.obtenerFechaFormateada()
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
