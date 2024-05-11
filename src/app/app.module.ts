import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './views/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../app/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductoModalComponent } from './views/producto/producto-modal/producto-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge'; 
import { RouterModule } from '@angular/router';
import { FacturasComponent } from './views/facturas/facturas.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { ProveedorComponent } from './views/proveedor/proveedor.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ClienteModalComponent } from './views/cliente/cliente-modal/cliente-modal.component';
import { ProveedorModalComponent } from './views/proveedor/proveedor-modal/proveedor-modal.component';
import { UsuarioModalComponent } from './views/usuario/usuario-modal/usuario-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FacturasModelComponent } from './views/facturas/facturas-model/facturas-model.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    ConfirmDialogComponent,
    ProductoModalComponent,
    FacturasComponent,
    ClienteComponent,
    ProveedorComponent,
    UsuarioComponent,
    ClienteModalComponent,
    ProveedorModalComponent,
    UsuarioModalComponent,
    FacturasModelComponent,
    InicioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    FormsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatBadgeModule,
    RouterModule,
    MatGridListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    provideAnimationsAsync(),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
