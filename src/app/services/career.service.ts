import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { careerModel } from '../models/careerModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private url: string = environment.url_career;

  careerSelected: careerModel | undefined;

  constructor(private http: HttpClient) { }

  listAll() {
    return this.http.get(this.url);
  }

  listById(id: number | undefined) {
    return this.http.get(this.url + '/id/' + id);
  }

  listByStatus(active: boolean) {
    return this.http.get(this.url + '/status/' + active);
  }
  
}
