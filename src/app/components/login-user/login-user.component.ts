import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";
import { UserModel } from 'src/app/models/UserModel';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  username: string = '';
  password: string = '';
  public userM: UserModel = new UserModel();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
      this.loginService.connect = false;
      this.loginService.currentUser = '';
    
  }
  //
  login(){
    this.userM.sname = this.username;
    this.userM.password = this.password;
    this.loginService.loginUser(this.userM).subscribe(
      (resp:any )=> {
        this.userM = resp;
        if(resp.srole == 'ROLE_GRADUATE' ){
          console.log('estoy en graduated')
          this.loginService.userSelected = resp;
          this.loginService.connect = true;
          this.router.navigate(['/procedure-student']).then();
        }
        if (resp.srole == 'ROLE_COLLABORATOR'){
          this.loginService.connect = true;
          this.loginService.currentUser = 'procedure';
          console.log('este es mi connenect:  ' + this.loginService.connect)
          console.log('este es mi user:  ' + this.loginService.currentUser)
          this.router.navigate(['/consolidador']).then();
          this.loginService.userSelected = resp;
        }
        if (resp.srole == 'ROLE_JEFE_MINEDU'){
          this.loginService.connect = true;
          this.loginService.currentUser = 'procedure';
          console.log('este es mi connenect:  ' + this.loginService.connect)
          console.log('este es mi user:  ' + this.loginService.currentUser)
          this.router.navigate(['/consolidador']).then();
          this.loginService.userSelected = resp;
        }
      },
      error => {
        console.log(error);
      }
  )}

  

  

}
