import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { studentModel } from '../models/studentModel';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private URL = environment.studentApi;

  private url: string = environment.url_student;
  studentSelected: studentModel | undefined;

  constructor(private http: HttpClient) { }

  getStudentById(id: number | any){
    return this.http.get(`${this.URL}/id/${id}`);
  }

  listAll() {
    return this.http.get(this.url);
  }

  listById(id: number | undefined) {
    return this.http.get(this.url + '/id/' + id);
  }

  listByStatus(status: string) {
    return this.http.get(this.url + '/status/' + status);
  }
  
  create(student: studentModel) {
    return this.http.post(this.url, student);
  } 

  update(student: studentModel) {
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






}
