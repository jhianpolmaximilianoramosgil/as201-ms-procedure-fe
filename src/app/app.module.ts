import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProcedureListComponent } from './components/procedure-list/procedure-list.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProcedureFormComponent } from './components/procedure-form/procedure-form.component';
import { RequestComponent } from './components/request/request.component';
import { ProcedureCollaboratorComponent } from './components/procedure-collaborator/procedure-collaborator.component';

import { ProcedureService } from './services/procedure.service';
import { PersonService } from './services/person.service';
import { DialogNoteComponent } from './components/dialog-note/dialog-note.component';
import { StudentService } from './services/student.service';
import { ProcedureTypeService } from './services/procedure-type.service';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAttachmentsComponent } from './components/dialog-attachments/dialog-attachments.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { DialogCareerComponent } from './components/dialog-career/dialog-career.component';
import { DialogPersonComponent } from './components/dialog-person/dialog-person.component';
import { ProcedureTableComponent } from './components/procedure-table/procedure-table.component';
import { ProcedureStudentComponent } from './components/procedure-student/procedure-student.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';


@NgModule({
  declarations: [
    LoginUserComponent,
    AppComponent,
    NavigationComponent,
    ProcedureListComponent,
    SidenavComponent,
    ProcedureFormComponent,
    RequestComponent,
    ProcedureCollaboratorComponent,
    DialogNoteComponent,
    DialogAttachmentsComponent,
    StudentListComponent,
    DialogCareerComponent,
    DialogPersonComponent,
    ProcedureTableComponent,
    ProcedureStudentComponent,
    FileUploadComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule
  ],
  entryComponents:[
    DialogNoteComponent,
  ],
  providers: [
    ProcedureService,
    PersonService,
    StudentService,
    ProcedureTypeService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
