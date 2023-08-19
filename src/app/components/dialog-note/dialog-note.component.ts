import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Procedure } from 'src/app/models/procedure';
import { LoginService } from 'src/app/services/login.service';
import { ProcedureService } from 'src/app/services/procedure.service';
import { ProcedureCollaboratorComponent } from '../procedure-collaborator/procedure-collaborator.component';
export interface DialogData {
  id: number;
  procedureConfigId: number;
  phaseId: number;
  studentId: number;
  personId: number;
  batch: number;
  note: number;
  collaboratorTypeId: number;
  active: boolean;
  createdDate: string;
  modifiedDate: string;
  procedure_type_name: string;
  person_name: string;
  phase_name: string;
  person_email: string;
}

@Component({
  selector: 'app-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.css'],
})
export class DialogNoteComponent implements OnInit {
  isValidNumber: boolean = true;
  btnEnabled: boolean = false;
  procedure: Procedure | undefined;
  procedures: any;
  note: number = 0;
  timeout: any;
  constructor(
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<DialogNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private procedureService: ProcedureService,
    public loginService: LoginService,
    private router: Router,
    public procedureCollabComponent: ProcedureCollaboratorComponent
  ) {}

  ngOnInit(): void {}

  Cerrar(): void {
    this.dialogRef.close();
  }

  validarProcedimiento() {
    this.validateNumber();
    if (this.isValidNumber) {
      this.procedure = this.data;
      this.procedure.note = this.note;
      this.procedureService
        .updateProcedure(this.procedure)
        .subscribe((resp) => {
          console.log(resp);
          /*  this.dialogRef.close(); */
          this.procedureService
            .getProceduresByCollaborator(
              this.loginService.collaboratorSelected?.collaborator_type_id
            )
            .subscribe(
              (res) => {
                this.procedures = res;
                this.procedures = this.procedures.reverse();
                console.log('mi regreso lista envi: ');
                console.log(this.procedures);

                this.dialogRef.close('closedWithSuccess');
                this.dialogRef.afterClosed().subscribe((result) => {
                  if (result === 'closedWithSuccess') {
                    this.procedureCollabComponent.procedures = [];
                    this.procedureCollabComponent.procedures = this.procedures;
                    console.log('eh salidoooooo del dialogoo');
                    console.log(this.procedureCollabComponent.procedures);
                    this.recargarComponente();
                    /* this.procedureCollabComponent.getProcedures(); */
                  } else console.log('no eh salido como se debe');
                });
                /*    this.procedureCollabComponent.dialogRef?.close('closedWithSuccess');  */
              },
              (er) => console.error(er)
            );
        });
    }
  }

  recargarComponente(): void {
    console.log('se recarga componente');
    this.router
      .navigateByUrl('/shura', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/shura']);
      });
  }

  validateNumber() {
    this.isValidNumber = !isNaN(this.note) && this.note <= 20;
    this.btnEnabled = this.isValidNumber;
    
  }

  onInputChange(event: Event) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.validateNumber();
      console.log("Input value changed:", (event.target as HTMLInputElement).value);
    }, 500);

  }
}
