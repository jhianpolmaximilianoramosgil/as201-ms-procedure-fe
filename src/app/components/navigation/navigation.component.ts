import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collaboratorModel } from 'src/app/models/CollaboratorModel';
import { personModel } from 'src/app/models/personModel';
import { studentModel } from 'src/app/models/studentModel';
import { UserModel } from 'src/app/models/UserModel';
import { LoginService } from 'src/app/services/login.service';
import { PersonService } from 'src/app/services/person.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class NavigationComponent implements OnInit {
  public collab: collaboratorModel = new collaboratorModel();
  public person: personModel = new personModel();
  public student: studentModel = new studentModel();
  public user: UserModel = new UserModel();
  public id?: number = 0;
  intervalID: any;
  isConnect: boolean = false;
  constructor(
    private personService: PersonService,
    public loginService: LoginService, private router: Router

  ) {
      this.intervalID = setInterval(() => {
        this.isConnect = this.loginService.isConnect();
        this.getDetails();
      }, 1000);

  }
  ngOnInit(): void {
    
  }



  getDetails() {
    if (this.loginService.userSelected?.srole == "ROLE_GRADUATE") {
      this.user = this.loginService.userSelected
      this.loginService.findByIdPerson(this.loginService.userSelected.id).subscribe(
        (resp: any) => {
          this.person = resp;
          this.id = this.person.id;
          this.loginService.personSelected = resp;
          this.loginService.findStudentByIdPerson(resp.id).subscribe((respStudent: any) => {
            this.student = respStudent;
            this.loginService.studentSelected = this.student;

          });
        });
    }
    else if (this.loginService.userSelected?.srole == "ROLE_COLLABORATOR"){
      this.user = this.loginService.userSelected
      this.loginService.findByIdPerson(this.loginService.userSelected.id).subscribe(
        (resp: any) => {
          this.person = resp;
          this.id = this.person.id;
          this.loginService.personSelected = resp;
          this.loginService.findCollaboratorByPersonId(resp.id).subscribe((respCollab: any) => {
            this.collab= respCollab;
            this.loginService.collaboratorSelected = this.collab;
          });
        });
    }
    else if (this.loginService.userSelected?.srole == "ROLE_JEFE_MINEDU"){
      this.user = this.loginService.userSelected
      this.loginService.findByIdPerson(this.loginService.userSelected.id).subscribe(
        (resp: any) => {
          this.person = resp;
          this.id = this.person.id;
          this.loginService.personSelected = resp;
          this.loginService.findCollaboratorByPersonId(resp.id).subscribe((respCollab: any) => {
            this.collab= respCollab;
            this.loginService.collaboratorSelected = this.collab;
          });
        });
    }
    else {
      this.router.navigate(['/login-user']).then();
    }

  
  }

  cambiarNombre(){
  }
  getPerson() {
    this.personService.getPersonById(this.id).subscribe(
      (res:any) => {
        this.person = res;
      },
      (er:any) => console.error(er)
    )
  }
  // getStudent() {
  //   this.studentService.getStudentById(this.id).subscribe(
  //     (res:any) => {
  //       this.person = res;
  //       console.log(this.person);
  //     },
  //     er => console.error(er)
  //   )
  // }
}
