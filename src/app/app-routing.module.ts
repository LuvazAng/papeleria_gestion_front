import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './views/producto/producto.component';
import { FacturasComponent } from './views/facturas/facturas.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { ProveedorComponent } from './views/proveedor/proveedor.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'productos', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'facturas', component: FacturasComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'proveedores', component: ProveedorComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
