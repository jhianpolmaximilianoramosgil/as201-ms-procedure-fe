import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { finalize } from 'rxjs';
import { careerModel } from 'src/app/models/careerModel';
import { personModel } from 'src/app/models/personModel';
import { studentModel } from 'src/app/models/studentModel';
import { CareerService } from 'src/app/services/career.service';
import { PersonService } from 'src/app/services/person.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { DialogCareerComponent } from '../dialog-career/dialog-career.component';
import { DialogPersonComponent } from '../dialog-person/dialog-person.component';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  dialogPersonModel: personModel | undefined;
  dialogCareerModel: careerModel | undefined;

  public personForm: FormGroup = new FormGroup({});

  persons: personModel[] = [];
  students: studentModel[] = [];
  phase: number = 5;

  person_table_page!: number;
  student_table_page!: number;

  person_type_list: number | undefined;
  active_person_list: boolean = true;

  student_type_list: number | undefined;
  status_student_list: string = '';

  visible_table_type: number | undefined;
  visible_person_table: boolean = true;
  visible_student_table: boolean = true;

  constructor(
    private personService: PersonService,
    private careerService: CareerService,
    private studentService: StudentService,
    private router: Router,
    public dialogPerson: MatDialog,
    public dialogCareer: MatDialog
  ) { }

  ngOnInit(): void {
    this.student_type_list = 2;
    this.status_student_list = 'G';
    this.listStudent();
  }

  pdfStudent() : void {
    let DATA: any = document.getElementById('pdfStudent');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Lista de Estudiantes');
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

  irFormStudent() {
    this.router.navigate(['/student-transaction-form']).then();
  }


  listStudent(): void {
    if(this.student_type_list == 1){
      this.status_student_list = 'E';
      this.listByStatusStudent();
    }
    if(this.student_type_list == 2){
      this.status_student_list = 'G';
      this.listByStatusStudent();
    }
    if(this.student_type_list == 3){
      this.status_student_list = 'R';
      this.listByStatusStudent();
    }
    if(this.student_type_list == 4){
      this.listAllStudent();
    }
  }

  listAllStudent(): void {
    this.studentService.listAll().subscribe((rest: any) => {
      this.students = rest;
      console.log("student", rest);
    })
  }

  listByStatusStudent(): void {
    this.studentService.listByStatus(this.status_student_list).subscribe((rest: any) => {
      this.students = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  editStudent(student: studentModel) {
    this.studentService.studentSelected = student;
    this.irFormStudent();
  }

  deleteGraduatedStudent(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas Cambiar a Egresado?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'error',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cambiando a Egresado...', '', 'success')
        this.studentService.deleteGraduated(id).subscribe(data => {
          console.log(data);
          this.listStudent();
        }
        );
      }
    })
  }

  deleteRetiredStudent(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas Cambiar a Retirado?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'error',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cambiando a Retirado...', '', 'success')
        this.studentService.deleteRetired(id).subscribe(data => {
          console.log(data);
          this.listStudent();
        }
        );
      }
    })
  }

  restoreStudent(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas descargar tu título?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        //Swal.fire('Cambiando a Estudiante...', '', 'success')
        //this.studentService.restore(id).subscribe(data => {
         // console.log(data);
          //this.listStudent();
        //}
        //);
      
      }
    })
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
          this.listStudent();
        }
        );
      
      }
    })
  }






}
