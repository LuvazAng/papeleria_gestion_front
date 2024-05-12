import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../service/factura.service';
import { ClienteService } from '../../service/cliente.service';
import { UsuarioService } from '../../service/usuario.service';
import { ProductoService } from '../../service/producto.service';
import { Cliente } from '../../model/cliente';
import { Usuario } from '../../model/usuario';
import { Producto } from '../../model/producto';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Factura } from '../../model/factura';
import { FacturasModelComponent } from './facturas-model/facturas-model.component';
import { StockVacioComponent } from './stock-vacio/stock-vacio.component';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent implements OnInit {

  // VARIABLES
  nextId: number;

  clientes: Cliente[]
  usuarios: Usuario[]
  productos: Producto[]

  clienteControl = new FormControl();
  usuarioControl = new FormControl();
  productoControl = new FormControl();

  filteredClientes: Observable<Cliente[]>;
  filteredUsuarios: Observable<Usuario[]>;
  filteredProductos: Observable<Producto[]>;

  selectedClienteId: number;
  selectedUsuarioId: number;
  selectedProductoId: number;

  detallesFactura: any[] = [];

  displayedColumns = [
    'producto',
    'precio',
    'cantidad',
    'subtotal',
    'acciones'
  ];

  dataSource: MatTableDataSource<any>;

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.detallesFactura);
    this.getNextId()

    this.clientes = []

    this.clienteService.listar().subscribe(clientes => {
      this.filteredClientes = this.clienteControl.valueChanges
        .pipe(
          startWith(''),
          map(cliente => cliente ? this._filterClientes(cliente) : clientes.slice())
        );
    });

    this.usuarioService.listar().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.filteredUsuarios = this.usuarioControl.valueChanges
        .pipe(
          startWith(''),
          map(usuario => usuario ? this._filterUsuarios(usuario) : this.usuarios.slice())
        );
    });

    this.productoService.listar().subscribe(productos => {
      this.productos = productos;
      this.filteredProductos = this.productoControl.valueChanges
        .pipe(
          startWith(''),
          map(producto => producto ? this._filterProductos(producto) : this.productos.slice())
        );
    });
  }

  getNextId() {
    this.facturaService.countRegister().subscribe(nextId => this.nextId = nextId + 1)
  }

  clearInput(control: FormControl) {
    control.setValue(''); // Limpia el valor del control pasado como argumento
  }

  private _filterClientes(value: string | Cliente): Cliente[] {
    const filterValue = (typeof value === 'string' ? value.toLowerCase() : value.nombreCliente.toLowerCase() + value.apellPaterno.toLowerCase());
    return this.clientes.filter(cliente => cliente.nombreCliente.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterUsuarios(value: string | Usuario): Usuario[] {
    const filterValue = (typeof value === 'string' ? value.toLowerCase() : value.nombreUsuario.toLowerCase());
    return this.usuarios.filter(usuario => usuario.nombreUsuario.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterProductos(value: string | Producto): Producto[] {
    const filterValue = (typeof value === 'string' ? value.toLowerCase() : value.nombreProducto.toLowerCase());
    return this.productos.filter(producto => producto.nombreProducto.toLowerCase().indexOf(filterValue) === 0);
  }

  displayClienteFn(cliente: Cliente): string {
    return cliente && cliente.nombreCliente ? cliente.nombreCliente : '';
  }

  displayUsuarioFn(usuario: Usuario): string {
    return usuario && usuario.nombreUsuario ? usuario.nombreUsuario : '';
  }

  displayFn(producto: Producto): string {
    return producto && producto.nombreProducto ? producto.nombreProducto : '';
  }

  onSelectCliente(cliente: Cliente): void {
    this.selectedClienteId = cliente.idCliente;
  }

  onSelectUsuario(usuario: Usuario): void {
    this.selectedUsuarioId = usuario.idUsuario;
  }

  onSelectProducto(producto: Producto): void {
    this.selectedProductoId = producto.idProducto;
  }

  agregarProducto(): void {
    const productoSeleccionado = this.productos.find(producto => producto.idProducto === this.selectedProductoId);
    if (productoSeleccionado && productoSeleccionado.stock > 0) { // Verificar si el producto existe y tiene stock disponible
      const cantidadInput = (document.getElementById('cantidad') as HTMLInputElement);
      let cantidad = parseInt(cantidadInput.value.trim(), 10);
  
      // Verificar si el campo de cantidad está vacío
      if (isNaN(cantidad) || cantidad <= 0) {
        // Si el campo de cantidad está vacío o no es un número válido, ingresar una cantidad predeterminada de 1
        cantidad = 1;
        cantidadInput.value = '1';
      }
  
      let subtotal = cantidad * productoSeleccionado.precioUnitario;
      subtotal = Number(subtotal.toFixed(3)); // Limitar a 2 decimales y convertir de nuevo a número
  
      // Buscar si el producto ya está en la tabla
      const indice = this.detallesFactura.findIndex(detalle => detalle.nombre === productoSeleccionado.nombreProducto);
  
      if (indice !== -1) { // Si el producto ya está en la tabla
        // Actualizar la cantidad y el subtotal
        this.detallesFactura[indice].cantidad = cantidad;
        this.detallesFactura[indice].subtotal = subtotal;
      } else { // Si el producto no está en la tabla, agregarlo
        const detalleProducto = {
          idProducto: productoSeleccionado.idProducto,
          nombre: productoSeleccionado.nombreProducto,
          precioUnitario: productoSeleccionado.precioUnitario,
          cantidad: cantidad,
          subtotal: subtotal
        };
  
        console.log(this.detallesFactura)
        this.detallesFactura.push(detalleProducto);
  
        this.dataSource.data = this.detallesFactura;
        // Renderizar las filas de la tabla para reflejar los cambios
        this.dataSource._updateChangeSubscription();
      }
    } else {
      this.dialog.open(StockVacioComponent, {
        width: '300px'
      });
    }
  }

  cancelarCompra(): void {
    // Limpiar los detalles de la factura
    this.detallesFactura = [];
    // Establecer la fuente de datos de la tabla como vacía
    this.dataSource.data = [];
    // Limpiar los controles de cliente, usuario y producto
    this.clearInput(this.clienteControl);
    this.clearInput(this.usuarioControl);
    this.clearInput(this.productoControl);

    // Establecer el valor predeterminado de 1 para el campo de cantidad
    const cantidadInput = document.getElementById('cantidad') as HTMLInputElement;
    cantidadInput.value = '1';
  }

  eliminarProducto(detalle: any): void {
    const indice = this.detallesFactura.findIndex(item => item.nombre === detalle.nombre);
    if (indice !== -1) {
      this.detallesFactura.splice(indice, 1);

      // Actualizar la fuente de datos de la tabla
      this.dataSource.data = [...this.detallesFactura];
    }
  }

  obtenerFechaFormateada() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Agrega cero inicial si es necesario
    const day = String(today.getDate()).padStart(2, '0'); // Agrega cero inicial si es necesario
    return `${year}-${month}-${day}`;
  }

  calcularTotal(): number {
    const total = this.detallesFactura.reduce((total, detalle) => total + detalle.subtotal, 0);
    return Number(total.toFixed(2)); // Limitar a 2 decimales y convertir a número
  }

  finalizarVenta(): void {
    if (!this.selectedClienteId || !this.selectedUsuarioId || !this.detallesFactura.length) {
      // Handle missing data (e.g., display an error message)
      console.error('Error: Se requiere seleccionar cliente, usuario o productos.');
      return;
    }
    const totalVenta = this.calcularTotal();

    const factura: Factura = {
      idFacturacion: 0,
      idUsuario: {
        idUsuario: this.selectedUsuarioId,
        // Include all other properties from Usuario
        nombreUsuario: '', // Set default values or retrieve from UI if available
        contrasenaUsuario: '',
        correoUsuario: '',
        rol: '',
        borradoUsuario: false
      },
      idCliente: {
        idCliente: this.selectedClienteId,
        // Include all other properties from Cliente
        nombreCliente: '',
        apellPaterno: '',
        apellMaterno: '',
        telefonoCliente: '',
        fechaCliente:this.obtenerFechaFormateada(),
        borradoCliente: false
      },
      fechaFactura: this.obtenerFechaFormateada(),
      totalVenta: totalVenta
    };

    this.facturaService.registrar(factura).subscribe(() => {
      // Iterar sobre los detalles de la factura
      for (const detalle of this.detallesFactura) {
        // Obtener el producto correspondiente
        const producto: Producto | undefined = this.productos.find(p => p.idProducto === detalle.idProducto);

        // Verificar si se encontró el producto
        if (producto) {
          // Restar la cantidad vendida del stock actual
          producto.stock -= detalle.cantidad;

          // Actualizar el producto en la base de datos
          this.productoService.editar(producto).subscribe(() => {
            console.log(`Stock actualizado para ${producto.nombreProducto}`);
          });
        } else {
          console.error(`Producto con id ${detalle.idProducto} no encontrado.`);
        }
      }

      this.getNextId();
      this.dialog.open(FacturasModelComponent, {
        width: '300px'
      });

      // Handle successful sale creation (e.g., clear form, display confirmation message)
      this.cancelarCompra();
    });
  }
}
