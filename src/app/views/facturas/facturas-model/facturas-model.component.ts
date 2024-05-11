import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-facturas-model',
  templateUrl: './facturas-model.component.html',
  styleUrl: './facturas-model.component.css'
})
export class FacturasModelComponent {
  constructor(public dialogRef: MatDialogRef<FacturasModelComponent>) { }

  closeDialog(){
    this.dialogRef.close();
  }

}
