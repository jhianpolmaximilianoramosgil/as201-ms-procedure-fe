import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { personModel } from '../models/personModel';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private URL = environment.personApi;

  private url: string = environment.url_person;
  personSelected: personModel | undefined;

  constructor(private http: HttpClient) { }

  getPersonById(id: number | any):any{
    return this.http.get(`${this.URL}/id/${id}`);
  }

  listAll() {
    return this.http.get(this.url);
  }

  listById(id: number | undefined) {
    return this.http.get(this.url + '/id/' + id);
  }

  listByStatus(active: boolean) {
    return this.http.get(this.url + '/active/' + active);
  }
  
  create(person: personModel) {
    return this.http.post(this.url, person);
  } 

  update(person: personModel) {
    return this.http.put(this.url, person);
  }

  delete(id: number | undefined) {
    return this.http.post(this.url + '/delete/'+ id,'');
  }

  restore(id: number | undefined) {
    return this.http.post(this.url + '/restore/'+ id,'');
  }

}
