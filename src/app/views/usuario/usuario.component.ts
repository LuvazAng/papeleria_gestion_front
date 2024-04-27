import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  displayedColumns = [
    'idUsuario',
    'nombreUsuario',
    'correo',
    'password',
    'rol',
    'opciones',
  ];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.usuarioService.usuarioActualizar.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });

    this.usuarioService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  onEdit(usuario?: Usuario) {
    let provee = usuario != null ? usuario : new Usuario();
    this.dialog.open(UsuarioModalComponent, {
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
        this.usuarioService.eliminar(id).subscribe(() => {
          this.usuarioService
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
