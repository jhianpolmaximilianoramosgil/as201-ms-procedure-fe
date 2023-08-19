import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { Procedure } from '../models/procedure';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  procedureSelected: Procedure | undefined ;
  private URL = environment.procedureApi;

  private url: string = environment.url_procedure;

 // procedureSelected: procedureModel | undefined;

  constructor(private http: HttpClient) { }

  getProcedures(){
    return this.http.get(this.URL);
  }

  getProceduresById(id: number | any): Observable<Procedure>{
    return this.http.get<Procedure>(`${this.URL}/${id}`);
  }

  getProceduresByPerson(id: number | any): Observable<Procedure>{
    return this.http.get<Procedure>(`${this.URL}/personId/${id}`);
  }

  getProceduresByCollaborator(id: number | any): Observable<Procedure>{
    console.log('llamando al servicio por collaborator por tipo : ' + id)
    return this.http.get<Procedure>(`${this.URL}/collaboratortypeId/${id}`);
  }

  saveProcedure(procedure: Procedure){
    return this.http.post(this.URL, procedure);
  }

  updateProcedure(procedure: Procedure){
    return this.http.put(this.URL, procedure);
  }

  //---------------------------

  listAll() {
    return this.http.get(this.url);
  }
  

  listById(id: number) {
    return this.http.get(this.url + '/id/' + id);
  }
  

  listByStatus(status: string) {
    return this.http.get(this.url + '/status/' + status);
  }
  
  create(student: Procedure) {
    return this.http.post(this.url, student);
  } 
  

  update(student: Procedure) {
    return this.http.put(this.url, student);
  }

  deleteGraduated(id: number | undefined) {
    return this.http.post(this.url + '/graduated/'+ id,'');
  }

  deleteRetired(id: number | undefined) {
    return this.http.post(this.url + '/retired/'+ id,'');
  }

  restore(id: number | undefined) {
    return this.http.post(this.url + '/restore/'+ id,'');
  }

  report(id: number | undefined) {
    return this.http.get(this.url + '/report1/'+ id);
  }

  cambiarPhase10(id: number | undefined) {
    return this.http.post(this.url + '/phase10/'+ id,'');
  }

  //G

  // listAll() {
  //   return this.http.get(this.url);
  // }

  listByBatchNull() {
    return this.http.get(this.url + '/null/');
  }

  listByBatchNotNull() {
    return this.http.get(this.url + '/notnull/');
  }

  // listById(id: number) {
  //   return this.http.get(this.url + '/id/'+ id);
  // }

  listByPhaseId(phase_id: number) {
    return this.http.get(this.url + '/phase_id/'+ phase_id);
  }
  
  createJ(procedure: Procedure) {
     return this.http.post(this.url, procedure);
  } 

  updateJ(procedure: Procedure) {
    return this.http.put(this.url, procedure);
  }

  notificationByEmail(institutionalEmail: string | undefined) {
    return this.http.post(this.url + '/notification/'+ institutionalEmail,'');
  }

  notification(procedure: Procedure) {
    return this.http.post(this.url + '/notification2', procedure);
  }

  notification3(institutionalEmail: string | undefined, message: string | undefined) {
    //return this.http.post(this.url + '/notification3/'+ institutionalEmail, message);
    return this.http.post(this.url + '/springnotification/'+ institutionalEmail, message);
  }

  consolidate(id: number | undefined) {
    return this.http.post(this.url + '/consolidateuno/'+ id,'');
  }

  consolidate4(id1: number | undefined, id2: number | undefined, id3: number | undefined) {
    return this.http.post(this.url + '/consolidate4/'+ id1 + '-' + id2 + '-' + id3, '');
  }

  consolidate5(id1: number | undefined, id2: number | undefined, id3: number | undefined, id4: number | undefined, id5: number | undefined) {
    return this.http.post(this.url + '/consolidate5/'+ id1 + '-' + id2 + '-' + id3 + '-' + id4 + '-' + id5, '');
  }

  consolidate6(id1: number | undefined, id2: number | undefined, id3: number | undefined, id4: number | undefined, id5: number | undefined) {
    return this.http.post(this.url + '/consolidate6/'+ id1 + '-' + id2 + '-' + id3 + '-' + id4 + '-' + id5, '');
  }


















  

}
