import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './views/producto/producto.component';
import { FacturasComponent } from './views/facturas/facturas.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { ProveedorComponent } from './views/proveedor/proveedor.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { InicioComponent } from './views/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'productos', component: ProductoComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'proveedores', component: ProveedorComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'inicio', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
