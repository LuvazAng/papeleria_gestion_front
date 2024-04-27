import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrl: './usuario-modal.component.css'
})
export class UsuarioModalComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private dialogRef: MatDialogRef<UsuarioModalComponent>,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) private data: Usuario
  ) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.idUsuario = this.data.idUsuario;
    this.usuario.nombreUsuario = this.data.nombreUsuario;
    if (!this.usuario.idUsuario) {
      this.usuario.contrasenaUsuario = "default";
    }else{
      this.usuario.contrasenaUsuario = this.data.contrasenaUsuario;
    }
    this.usuario.correoUsuario = this.data.correoUsuario;
    this.usuario.rol = this.data.rol;
  }



  itemSave() {
    if (this.usuario != null && this.usuario.idUsuario > 0) {
      this.usuarioService.editar(this.usuario).subscribe(() => {
        return this.usuarioService.listar().subscribe(data => {
          this.usuarioService.usuarioActualizar.next(data);
        })
      });

    } else {
      this.usuarioService.registrar(this.usuario).subscribe(() => {
        this.usuarioService.listar().subscribe(data => {
          this.usuarioService.usuarioActualizar.next(data);
        })
      })
    }
    this.itemClose()
  }

  itemClose() {
    this.dialogRef.close();
  }
}
