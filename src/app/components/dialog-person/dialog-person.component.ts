import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { personModel } from 'src/app/models/personModel';

@Component({
  selector: 'app-dialog-person',
  templateUrl: './dialog-person.component.html',
  styleUrls: ['./dialog-person.component.css']
})
export class DialogPersonComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPerson: personModel
  ) {}

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
