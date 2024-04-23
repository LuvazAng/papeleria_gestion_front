import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog'


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent implements OnInit{
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ){}
  
  ngOnInit(): void {

  }

  onClickDelete(){
    this.dialogRef.close(true)
  }

  onClickCancel(){
    this.dialogRef.close(false)
  }

}
