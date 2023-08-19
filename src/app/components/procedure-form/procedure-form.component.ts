import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { personModel } from 'src/app/models/personModel';
import { Procedure } from 'src/app/models/procedure';
import { studentModel } from 'src/app/models/studentModel';
import { UserModel } from 'src/app/models/UserModel';
import { LoginService } from 'src/app/services/login.service';
import { PersonService } from 'src/app/services/person.service';
import { ProcedureService } from 'src/app/services/procedure.service';
import { NavigationComponent } from '../navigation/navigation.component';

//-----------
import { careerModel } from 'src/app/models/careerModel';
import { CareerService } from 'src/app/services/career.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-procedure-form',
  templateUrl: './procedure-form.component.html',
  styleUrls: ['./procedure-form.component.css']
})
export class ProcedureFormComponent implements OnInit {

  applicant = false;
  note = true;
  person?: personModel = new personModel();
  student?: studentModel = new studentModel();
  user: UserModel = new UserModel();
  procedure: Procedure = new Procedure();
  myForm!: FormGroup;

  //----
  persons: personModel[] = [];
  careers: careerModel[] = [];

  public procedureForm: FormGroup = new FormGroup({});
  edit: boolean = false;
  //procedure: procedureModel = new procedureModel();
  //-----


  constructor(
    public careerService: CareerService,
    public navigation: NavigationComponent,
    public loginService: LoginService, 
    public router: Router, 
    private formBuilder: FormBuilder, 
    public personService: PersonService,
    public procedureService: ProcedureService) {
    this.myForm = this.formBuilder.group(
      {
        id: [''],
        procedureConfigId: [''],
        phaseId: [''],
        studentId: ['',],
        personId: [''],
        batch: [0],
        note: [0],
        collaboratorTypeId: [''],
        active: [''],
        person_name: [''],
        phase_name: [''],
      }
    );
    if (this.procedureService.procedureSelected) {
      console.log('si tengo datos procedure')
      this.personService.getPersonById(this.loginService.personSelected?.id).subscribe((resp: any)=> {
        this.person = resp;
       });
  
      this.myForm.patchValue({
        id: this.procedureService.procedureSelected.id,
        procedureConfigId: this.procedureService.procedureSelected.procedureConfigId,
        phaseId: this.procedureService.procedureSelected.phaseId,
        studentId: this.loginService.studentSelected?.id,
        personId: this.loginService.personSelected?.id,
        batch: this.procedureService.procedureSelected.batch,
        note: this.procedureService.procedureSelected.note,
        collaboratorTypeId: this.procedureService.procedureSelected.collaboratorTypeId,
        active: this.procedureService.procedureSelected.active,
        person_name: this.loginService.personSelected?.name + ', ' + this.loginService.personSelected?.lastname,
        phase_name: this.procedureService.procedureSelected.phase_name

      });
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.listPersonByStatus();
    this.listCareerByStatus();
    console.log('Object Procedure: ' , this.procedureService.procedureSelected);
  }

  crearProcedimiento() {
    this.procedure = { ...this.myForm.value };
    this.procedureService.saveProcedure(this.procedure).subscribe(
      resp => {
        this.router.navigate(['/procedure']).then();
        console.log(resp);
      },
      error => {
        console.log(error);
      }
    );
  }



  //------------

  initForm(): void {
    this.procedureForm = this.formBuilder.group(
      {
        id: [''],
        unique_identifier:['', Validators.required] ,
        procedure_config_id:['', Validators.required] ,
        phase_id:['', Validators.required] ,
        person_id:['', Validators.required] ,
        student_id:['', Validators.required] ,
        institute_id:['', Validators.required] ,
        link: ['', Validators.required] ,
        batch:['']
      }
    );
    if (this.procedureService.procedureSelected) {
      this.procedureForm.patchValue({
          id: this.procedureService.procedureSelected.id,
          unique_identifier: this.procedureService.procedureSelected.unique_identifier,
          procedure_config_id: this.procedureService.procedureSelected.procedure_config_id,
          phase_id: this.procedureService.procedureSelected.phase_id,
          person_id: this.procedureService.procedureSelected.person_id,
          student_id: this.procedureService.procedureSelected.student_id,
          institute_id: this.procedureService.procedureSelected.institute_id,
          link: this.procedureService.procedureSelected.link,
          batch: this.procedureService.procedureSelected.batch
      });
    }
  }

  save(){
    if (this.procedureService.procedureSelected){
      this.update();
    }else {
      this.register();
    }
  }

  register() {
    Swal.fire({
      title: '¿Deseas Guardar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.btnCancel();
        this.procedure = { ...this.procedureForm.value };
        this.procedureService.create(this.procedure).subscribe(
          resp => {
            console.log(resp);
            this.edit = true;
          },
          error => {
            console.log(error);
          }
        );
      }
    })
  }

  update() {
    Swal.fire({
      title: '¿Deseas Actualizar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.btnCancel();
        this.procedure = { ...this.procedureForm.value };
        this.procedureService.update(this.procedure).subscribe(
          resp => {
            console.log(resp);
            this.edit = true;
          },
          error => {
            console.log(error);
          }
        );
      }
    })
  }

  btnCancel(){
    this.router.navigate(['/procedure']).then();
  }

  ngOnDestroy(): void {
    this.procedureService.procedureSelected = undefined;
  }

  listPersonByStatus(): void {
    this.personService.listByStatus(true).subscribe((rest: any) => {
      this.persons = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  listCareerByStatus(): void {
    this.careerService.listByStatus(true).subscribe((rest: any) => {
      this.careers = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  cambiarPhase10(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas enviar el link y cambiar de fase?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cambiando Fase...', '', 'success')
        this.procedureService.cambiarPhase10(id).subscribe(data => {
          console.log(data);
          this.irFormProcedure();
        }
        );
      }
    })
  }

  irFormProcedure(){
    this.router.navigate(['/procedure']).then();
  }

}
