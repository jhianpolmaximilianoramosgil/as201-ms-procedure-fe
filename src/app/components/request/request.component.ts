import { Component, HostBinding, Injectable, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { personModel } from 'src/app/models/personModel';
import { Procedure } from 'src/app/models/procedure';
import { studentModel } from 'src/app/models/studentModel';
import { UserModel } from 'src/app/models/UserModel';
import { LoginService } from 'src/app/services/login.service';
import { ProcedureTypeService } from 'src/app/services/procedure-type.service';
import { ProcedureService } from 'src/app/services/procedure.service';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})

export class RequestComponent implements OnInit {
  // @ViewChild(NavigationComponent, {static:true}) navigation: NavigationComponent;
  @HostBinding('class') classes = 'row';

  proceduresTypes: any = [];
  procedure: Procedure = new Procedure();
  person: personModel = new personModel();
  student: studentModel = new studentModel();
  user: UserModel = new UserModel();
  constructor(public procedureTypeService: ProcedureTypeService, public navigation: NavigationComponent,
    public loginService: LoginService, private router: Router,public procedureService: ProcedureService) {
   }

  ngOnInit(): void { 

    if (this.loginService.userSelected) {
      this.loginService.findByIdPerson(this.loginService.userSelected.id).subscribe(
        (resp: any) => {
          this.person = resp;
          this.loginService.findStudentByIdPerson(resp.id).subscribe((respStudent: any) => {
            this.student = respStudent;
            this.loginService.studentSelected = this.student;
            this.navigation.getDetails();
          });
        });
        
    }
    else {
      this.router.navigate(['/login-user']).then();
      console.log('no hay nada')
    }
    this.getProcedures();
  }

  name = 'Certificados';
  image = '';
  description = 'Solicite aquí su certificado de forma fácil y automática'

  getProcedures() {
    this.procedureTypeService.getProceduresTypes().subscribe(
      res => {
        this.proceduresTypes = res;
        this.proceduresTypes = this.proceduresTypes.reverse();
      },
      er => console.error(er)
    )
  }

  cargarProcedimiento(){
    this.procedure.procedureConfigId= 1;
    this.procedure.phaseId= 1;
    this.procedure.note= 0;
    this.procedure.batch= 0;
    this.procedureService.procedureSelected=this.procedure;
    this.router.navigate(['/form']).then();

  }

}
