import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ProcedureCollaboratorComponent } from './components/procedure-collaborator/procedure-collaborator.component';
import { ProcedureFormComponent } from './components/procedure-form/procedure-form.component';
import { ProcedureListComponent } from './components/procedure-list/procedure-list.component';
import { RequestComponent } from './components/request/request.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ShuraComponent } from './components/shura/shura.component';
import { viewRenderComponent } from './components/viewRender/viewRender.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ProcedureTableComponent } from './components/procedure-table/procedure-table.component';
import { ProcedureStudentComponent } from './components/procedure-student/procedure-student.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/request',
    pathMatch: 'full'
  },
  {
    path: 'request',
    component: ProcedureFormComponent
  },
  {
    path: 'procedure',
    component: ProcedureListComponent
  },
  {
    path: 'form',
    component: ProcedureFormComponent
  },
  {
    path: 'procedure-colab',
    component: ProcedureCollaboratorComponent
  },
  {
    path: 'login-user',
    component: LoginUserComponent
  },
  {
    path: 'sidenav',
    component: SidenavComponent
  },
  {
    path: 'shura',
    component: ShuraComponent
  },
  {
    path: 'viewRender',
    component: viewRenderComponent
  },
  {
    path: 'student',
    component: StudentListComponent
  },
  {
    path: 'consolidador',
    component: ProcedureTableComponent
  },
  {
    path: 'procedure-student',
    component: ProcedureStudentComponent
  },
  {
    path: 'fileupload',
    component: FileUploadComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
