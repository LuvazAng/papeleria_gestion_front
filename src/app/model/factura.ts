import { Cliente } from "./cliente";
import { Usuario } from "./usuario";

export class Factura{
    idFacturacion: number;
    idUsuario: Usuario;
    idCliente: Cliente;
    fechaFactura: string;
    totalVenta: number;
}