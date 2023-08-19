import { Component, OnInit, Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { ProcedureService } from 'src/app/services/procedure.service';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';
import { Procedure } from 'src/app/models/procedure';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { personModel } from 'src/app/models/personModel';
import { studentModel } from 'src/app/models/studentModel';
import { UserModel } from 'src/app/models/UserModel';
import { collaboratorModel } from 'src/app/models/CollaboratorModel';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AttachmentModel } from 'src/app/models/AttachmentModel';
import { AttachmentsService } from 'src/app/services/attachments.service';
import { DialogAttachmentsComponent } from '../dialog-attachments/dialog-attachments.component';

@Component({
  selector: 'app-procedure-collaborator',
  templateUrl: './procedure-collaborator.component.html',
  styleUrls: ['./procedure-collaborator.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class ProcedureCollaboratorComponent implements OnInit {
  procedures?: any = [];
  procedureM: Procedure | undefined;
  person: personModel = new personModel();
  collaborator: collaboratorModel = new collaboratorModel();
  user: UserModel = new UserModel();
  dialogRef: MatDialogRef<DialogNoteComponent, any> | null = null;
  dialogRefAttach: MatDialogRef<DialogAttachmentsComponent, any> | null = null;
  public attachment: AttachmentModel = new AttachmentModel();
  constructor(
    private dialog: MatDialog,
    private procedureService: ProcedureService,
    public navigation: NavigationComponent,
    public loginService: LoginService,
    private router: Router,
    private attachmentService: AttachmentsService,
    
  ) {}

  ngOnInit(): void {
    if (this.loginService.userSelected) {
      this.loginService
        .findByIdPerson(this.loginService.userSelected.id)
        .subscribe((resp: any) => {
          this.person = resp;

          this.loginService
            .findCollaboratorByPersonId(resp.id)
            .subscribe((respCollaborator: any) => {
              console.log(respCollaborator);
              this.collaborator = respCollaborator;
              this.loginService.collaboratorSelected = this.collaborator;
              this.getProcedures();
            });
        });
    } else {
      this.router.navigate(['/login-user']).then();
    }
  }

  getProcedures() {
    this.procedureService
      .getProceduresByCollaborator(
        this.loginService.collaboratorSelected?.collaborator_type_id
      )
      .subscribe(
        (res) => {
          console.log('le eh llamado desd edialog')
          this.procedures = res;
          this.procedures = this.procedures.reverse();
          this.getAttachmentsForProcedures();
        },
        (er) => console.error(er)
      );
  }

  getAttachmentsForProcedures() {
    for (const procedure of this.procedures) {
      this.attachmentService.getAttachments(procedure.id).subscribe(
        res => {
          procedure.attachments = res
        },
        er => console.error(er)
      )
    }
  }

  openAttachmentPreview(imageId: string, url: string) {
    console.log(imageId)

    this.attachmentService.getAttachment(imageId)
      .subscribe(
        (res: any) => {
          this.attachment = res,
            console.log(res)

          console.log(imageId)
          console.log(this.attachment.url)

          this.dialogRefAttach = this.dialog.open(DialogAttachmentsComponent, {
            width: '600px',
            data: {
              upload: false,
              name: imageId,
              url: this.attachment.url,
            }
          });


        },
        (er) => console.log(er)
      )
  }

  validarProcedimiento(idProc: number) {
    console.log(idProc);
    this.procedureService.getProceduresById(idProc).subscribe((res) => {
      this.procedureM = res;
      this.procedureService
        .updateProcedure(this.procedureM)
        .subscribe((resp) => {
          this.procedureService
            .getProceduresByCollaborator(
              this.loginService.collaboratorSelected?.collaborator_type_id
            )
            .subscribe(
              (res) => {
                this.procedures = res;
                this.procedures = this.procedures.reverse();
              },
              (er) => console.error(er)
            );
        });
    });
  }

  openDialog(idProc: number) {
    console.log(idProc);
   
    this.procedureService
      .getProceduresById(idProc)
      .pipe(
        finalize(() =>
        
        this.dialogRef =  this.dialog.open(DialogNoteComponent, {
            width: '600px',
            height: '430px',
            data: {
              id: this.procedureM ? this.procedureM.id : undefined,
              procedureConfigId: this.procedureM
                ? this.procedureM.procedureConfigId
                : undefined,
              phaseId: this.procedureM ? this.procedureM.phaseId : undefined,
              studentId: this.procedureM
                ? this.procedureM.studentId
                : undefined,
              personId: this.procedureM ? this.procedureM.personId : undefined,
              batch: this.procedureM ? this.procedureM.batch : undefined,
              note: this.procedureM ? this.procedureM.note : undefined,
              collaboratorTypeId: this.procedureM
                ? this.procedureM.collaboratorTypeId
                : undefined,
              active: this.procedureM ? this.procedureM.active : undefined,
              createdDate: this.procedureM
                ? this.procedureM.createdDate
                : undefined,
              modifiedDate: this.procedureM
                ? this.procedureM.modifiedDate
                : undefined,
              procedure_type_name: this.procedureM
                ? this.procedureM.procedure_type_name
                : undefined,
              phase_name: this.procedureM
                ? this.procedureM.phase_name
                : undefined,
              person_name: this.procedureM
                ? this.procedureM.person_name
                : undefined,
              person_email: this.procedureM
                ? this.procedureM.person_email
                : undefined,
            },
          }
          )
        )
      )
      .subscribe((res) => {

        this.procedureM = res;
      });

      
  }
}
