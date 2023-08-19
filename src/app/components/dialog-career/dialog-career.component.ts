import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { careerModel } from 'src/app/models/careerModel';

@Component({
  selector: 'app-dialog-career',
  templateUrl: './dialog-career.component.html',
  styleUrls: ['./dialog-career.component.css']
})
export class DialogCareerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCareerComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCareer: careerModel
  ) {}

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
