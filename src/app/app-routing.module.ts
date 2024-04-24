import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './views/producto/producto.component';
import { FacturasComponent } from './views/facturas/facturas.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { ProveedorComponent } from './views/proveedor/proveedor.component';
import { UsuarioComponent } from './views/usuario/usuario.component';

const routes: Routes = [
  {path: 'productos', component: ProductoComponent},
  {path: 'facturas', component: FacturasComponent},
  {path: 'clientes', component: ClienteComponent},
  {path: 'proveedores', component: ProveedorComponent},
  {path: 'usuarios', component: UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
