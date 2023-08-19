import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { personModel } from 'src/app/models/personModel';
import { studentModel } from 'src/app/models/studentModel';
import { UserModel } from 'src/app/models/UserModel';
import { AttachmentModel } from 'src/app/models/AttachmentModel';
import { LoginService } from 'src/app/services/login.service';
import { ProcedureService } from '../../services/procedure.service'
import { NavigationComponent } from '../navigation/navigation.component';
//import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAttachmentsComponent } from '../dialog-attachments/dialog-attachments.component';
import { AttachmentsService } from 'src/app/services/attachments.service';

//------
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { careerModel } from 'src/app/models/careerModel';
import { CareerService } from 'src/app/services/career.service';
import { StudentService } from 'src/app/services/student.service';
import { PersonService } from 'src/app/services/person.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Procedure } from 'src/app/models/procedure';
//import { ProcedureService } from 'src/app/services/procedure.service';
import Swal from 'sweetalert2';
import { DialogPersonComponent } from 'src/app/components/dialog-person/dialog-person.component';
import { DialogCareerComponent } from 'src/app/components/dialog-career/dialog-career.component';
//import { DialogStudentComponent } from 'src/app/components/dialog-student/dialog-student.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.css']
})
export class ProcedureListComponent implements OnInit {
//---
  dialogPersonModel: personModel | undefined;
  dialogCareerModel: careerModel | undefined;
  dialogStudentModel: studentModel | undefined;
//----
  viewBtnAttach: boolean = false;
  attachments: any = [];
 // procedures: any = [];

//----
  persons: personModel[] = [];
  students: studentModel[] = [];
  
  procedures: Procedure[] = [];


  batch: number | undefined;

  procedure_table_page!: number;
  person_type_list: number | undefined;
  active_person_list: boolean = true;

  procedure_type_list: number | undefined;
  status_procedure_list: string = '';

  visible_table_type: number | undefined;
  visible_person_table: boolean = true;
  visible_student_table: boolean = true;




//----


  public person: personModel = new personModel();
  public student: studentModel = new studentModel();
  public user: UserModel = new UserModel();
  public attachment: AttachmentModel = new AttachmentModel();
  public id?: number = 0;
  dialogRef: MatDialogRef<DialogAttachmentsComponent, any> | null = null;
  isJumping: boolean = true;


  constructor(
    private dialog: MatDialog, 
    private procedureService: ProcedureService, 
    public loginService: LoginService,
    private router: Router, 
    public navigation: NavigationComponent, 
    private attachmentService: AttachmentsService,
  
   // private procedureService: ProcedureService,
    private careerService: CareerService,
    private studentService: StudentService,
    private personService: PersonService,
   // private router: Router,
    public dialogPerson: MatDialog,
    public dialogCareer: MatDialog,
    public dialogStudent: MatDialog  
    ) {

      
     } //,

  ngOnInit(): void {
    //this.listAllProcedure();
    //this.listByPhaseId();
    this.listById();
   // this.getProcedures();
    this.navigation.getDetails();
  }

  btnEnviarHash(){
    this.router.navigate(['/fileupload']).then();
  }

  descargarPDF() {
    const nombreArchivo = 'Egresado.pdf';
    const rutaArchivo = `assets/${nombreArchivo}`;
    const enlace = document.createElement('a');
    enlace.href = rutaArchivo;
    enlace.target = '_blank';
    enlace.download = nombreArchivo;
    //const nuevaPestana = window.open('http://localhost:3000', '_blank');
    enlace.click();
    // setTimeout(() => {
    //   window.open('http://localhost:1200', '_blank');
    // }, 100);
  }

  // descargarPDF() {
  //   const nombreArchivo = 'Egresado.pdf';
  //   const rutaArchivo = `assets/${nombreArchivo}`;
    
  //   // Descargar el archivo
  //   const enlaceDescarga = document.createElement('a');
  //   enlaceDescarga.href = rutaArchivo;
  //   enlaceDescarga.target = '_blank';
  //   enlaceDescarga.download = nombreArchivo;
  //   enlaceDescarga.click();
  
  //   // Abrir una nueva pestaña con la URL deseada
  //   const nuevaPestana = window.open('http://localhost:3000', '_blank');
  // }
  












  listByPhaseId(): void {
    this.procedureService.listByPhaseId(7).subscribe((rest: any) => {
      this.procedures = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  listById(): void {
    this.procedureService.listById(13).subscribe((rest: any) => {
      this.procedures = rest;
      console.log("procedure", rest);
    })
  }


/* 
  toggleJumping() {
    this.isJumping  = !this.isJumping;
  }

  getProcedures() {
    if (this.loginService.userSelected) {
      this.loginService.findByIdPerson(this.loginService.userSelected.id).subscribe(
        (resp: any) => {
          this.person = resp;
          this.loginService.findStudentByIdPerson(resp.id).subscribe((respStudent: any) => {
            this.student = respStudent;
            this.loginService.studentSelected = this.student;

          });
        });

    }
    else {
      this.router.navigate(['/login-user']).then();
      console.log('no hay nada')
    }

    this.procedureService.getProceduresByPerson(this.loginService.personSelected?.id).subscribe(
      res => {

        this.procedures = this.procedures.reverse();

        this.getAttachmentsForProcedures();
      },
      er => console.error(er)
    )
  }

  getAttachmentsForProcedures() {
    for (const procedure of this.procedures) {
      this.attachmentService.getAttachments(procedure.id).subscribe(
        res => {
        },
        er => console.error(er)
      )
    }
  }

  downloadAttachment(imageId: string) {
    console.log(imageId);
    this.attachmentService.downloadImage(imageId)
      .subscribe(
        (imageBlob: Blob) => {
          const url = URL.createObjectURL(imageBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = imageId;
          link.click();
          URL.revokeObjectURL(url);
        },
        error => console.log("Error: " + error)
      )
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

          this.dialogRef = this.dialog.open(DialogAttachmentsComponent, {
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

  openUpload(procedureId: number) {
    console.log(procedureId)

    this.dialogRef = this.dialog.open(DialogAttachmentsComponent, {
      width: '600px',
      data: {
        upload: true,
        procedureId: procedureId,
      }
    });
  }
*/



  //--------------

  

  pdfStudent() : void {
    let DATA: any = document.getElementById('pdfProcedure');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Lista de Procedimientos');
    });
  }

  openDialogPerson(person_id: number | undefined){
    console.log(person_id);
    this.personService.listById(person_id).pipe(finalize(() => this.dialogPerson.open(DialogPersonComponent, {
      data: {
        id: this.dialogPersonModel ? this.dialogPersonModel.id: undefined,
        id_type: this.dialogPersonModel ? this.dialogPersonModel.id_type: undefined,
        id_number: this.dialogPersonModel ? this.dialogPersonModel.id_number: undefined,
        name: this.dialogPersonModel ? this.dialogPersonModel.name: undefined,
        lastname: this.dialogPersonModel ? this.dialogPersonModel.lastname: undefined,
        cellphone: this.dialogPersonModel ? this.dialogPersonModel.cellphone: undefined,
        email: this.dialogPersonModel ? this.dialogPersonModel.email: undefined,
        level: this.dialogPersonModel ? this.dialogPersonModel.level: undefined,
        username: this.dialogPersonModel ? this.dialogPersonModel.username: undefined,
        password: this.dialogPersonModel ? this.dialogPersonModel.password: undefined,
        active: this.dialogPersonModel ? this.dialogPersonModel.active: undefined,
      },
    },)
    )).subscribe(rest => {
      this.dialogPersonModel = rest;
    });
    console.log('fin de openDialogPerson');
  }


  openDialogStudent(student_id: number | undefined){
    console.log(student_id);
    this.studentService.listById(student_id).pipe(finalize(() => this.dialogStudent.open(DialogCareerComponent, {
      data: {
        id: this.dialogStudentModel ? this.dialogStudentModel.id: undefined,
        person_id: this.dialogStudentModel ? this.dialogStudentModel.person_id: undefined,
        person_name: this.dialogStudentModel ? this.dialogStudentModel.person_name: undefined,
        career_id: this.dialogStudentModel ? this.dialogStudentModel.career_id: undefined,
        career_name: this.dialogStudentModel ? this.dialogStudentModel.career_name: undefined,
        institutional_email: this.dialogStudentModel ? this.dialogStudentModel.institutional_email: undefined,
        pay_method: this.dialogStudentModel ? this.dialogStudentModel.pay_method: undefined,
        admission_date: this.dialogStudentModel ? this.dialogStudentModel.admission_date: undefined,
        guardian_name: this.dialogStudentModel ? this.dialogStudentModel.guardian_name: undefined,
        home_phone: this.dialogStudentModel ? this.dialogStudentModel.home_phone: undefined,
        status: this.dialogStudentModel ? this.dialogStudentModel.status: undefined,
        phase_id: this.dialogStudentModel ? this.dialogStudentModel.phase_id: undefined,
        link: this.dialogStudentModel ? this.dialogStudentModel.link: undefined,

      },
    },)
    )).subscribe(rest => {
      this.dialogStudentModel = rest;
    });
    console.log('fin de openDialogStudent');
  }

  openDialogCareer(career_id: number | undefined){
    console.log(career_id);
    this.careerService.listById(career_id).pipe(finalize(() => this.dialogCareer.open(DialogCareerComponent, {
      data: {
        id: this.dialogCareerModel ? this.dialogCareerModel.id: undefined,
        name: this.dialogCareerModel ? this.dialogCareerModel.name: undefined,
        boss: this.dialogCareerModel ? this.dialogCareerModel.boss: undefined,
        area: this.dialogCareerModel ? this.dialogCareerModel.area: undefined,
        institute_id: this.dialogCareerModel ? this.dialogCareerModel.institute_id: undefined,
        pension: this.dialogCareerModel ? this.dialogCareerModel.pension: undefined,
        quantity_course: this.dialogCareerModel ? this.dialogCareerModel.quantityCourse: undefined,
        quantity_semester: this.dialogCareerModel ? this.dialogCareerModel.quantitySemester: undefined,
        active: this.dialogCareerModel ? this.dialogCareerModel.active: undefined,
      },
    },)
    )).subscribe(rest => {
      this.dialogCareerModel = rest;
    });
    console.log('fin de openDialogCareer');
  }

  irFormProcedure() {
    // this.router.navigate(['/procedure-form']).then();
    this.router.navigate(['/form']).then();
  }



  listProcedure(): void {
    if(this.procedure_type_list == 1){
      this.status_procedure_list = 'E';
      this.listByStatusProcedure();
    }
    if(this.procedure_type_list == 2){
      this.status_procedure_list = 'G';
      this.listByStatusProcedure();
    }
    if(this.procedure_type_list == 3){
      this.status_procedure_list = 'R';
      this.listByStatusProcedure();
    }
    if(this.procedure_type_list == 4){
      this.listAllProcedure();
    }
  }

  listAllProcedure(): void {
    this.procedureService.listAll().subscribe((rest: any) => {
      this.procedures = rest;
      console.log("procedure", rest);
    })
  }

  listByStatusProcedure(): void {
    this.procedureService.listByStatus(this.status_procedure_list).subscribe((rest: any) => {
      this.procedures = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  editProcedure(procedure: Procedure) {
    this.procedureService.procedureSelected = procedure;
    this.irFormProcedure();
  }


  report(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas descargar tu título?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Descargando titulo en pc local...', '', 'success')
        
        this.studentService.report(id).subscribe(data => {
          console.log(data);
          this.listProcedure();
        }
        );
        //window.location.href = 'http://localhost:3000';
        window.open('http://localhost:1200', '_blank'); 
      
      }
    })
}
}
