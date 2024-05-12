import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-vacio',
  templateUrl: './stock-vacio.component.html',
  styleUrl: './stock-vacio.component.css'
})
export class StockVacioComponent {
  constructor(public dialogRef: MatDialogRef<StockVacioComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
