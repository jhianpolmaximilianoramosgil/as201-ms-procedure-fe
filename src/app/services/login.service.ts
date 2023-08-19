import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';
import { studentModel } from '../models/studentModel';
import { personModel } from '../models/personModel';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { collaboratorModel } from '../models/CollaboratorModel';
import { Procedure } from '../models/procedure';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  username: string | undefined;
  password: string | undefined;
  // private url: string = 'http://localhost:8090/login'; 
  private url: string = 'https://as201-ms-login.azurewebsites.net/login';
  private urlstudent: string = 'http://deillanes.com/backend/student/student';
  // private url_student: string = 'http://localhost:8086/v1/student';
  private url_student: string = 'http://deillanes.com/backend/student/student';
  private url_person: string = 'http://localhost:8086/v1/student';
  //private url_procedure: 'http://localhost:8088/v1/procedure',
  private urldata: string = 'http://www.deillanes.com/backend/person/person';
  private urlcollab = environment.url_procedure;
  collaboratorSelected: collaboratorModel | undefined;
  userSelected: UserModel | undefined;
  personSelected: personModel | undefined;
  studentSelected: studentModel | undefined;
  procedureSelected: Procedure | undefined;

  currentUser: string = ''; // Cambiar a 'admin' para probar con usuario administrador
  connect: boolean = false; 
  constructor(private http: HttpClient) {}
  getUserType(): string {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser === 'collaborator';
  }

  isConnect(): boolean {
    return this.connect == true;
  }

  // LOGINS  es mi login
  loginUser(data: any): Observable<any> {
    
    return this.http.post(this.url + '/user', data);
  }



  // loginUserr(username: string, password: string) :any{
  //     return this.http.post(this.url + '/login/user',
  //       {
  //         headers: { authorization: this.createBasicAuthToken(username, password) } ,
  //         body: { sname: username , password: password }
  //       }).pipe(map((res: any) => {
  //         console.log('ingrese ' + res.username)
  //       this.username = username;
  //       this.password = password;
  //     }));
  // }

  loginCollaborator(username: string, password: string) {
    this.currentUser == 'collaborator';
    return this.http
      .get(this.url + '/login/collaborator', {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          this.connect = true;
          this.username = username;
          this.password = password;
        })
      );
  }

  loginAdmin(username: string, password: string) {
    return this.http
      .get(this.url + '/login/admin', {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          this.username = username;
          this.password = password;
        })
      );
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }
  findByIdPerson(id: number | undefined): Observable<any> {
    return this.http.get(this.urldata + '/id/' + id);
  }
  
  findStudentByIdPerson(id: number | undefined): Observable<any> {
    return this.http.get(this.url_student + '/personId/' + id);
  }
  findCollaboratorByPersonId(id: number | any): any {
    return this.http.get(`${this.urlcollab}/procedure/${id}`);
  }

}
