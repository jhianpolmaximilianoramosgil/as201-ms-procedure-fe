import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { proceduretype } from '../models/procedure-type';

@Injectable({
  providedIn: 'root'
})
export class ProcedureTypeService {
  procedureTypeSelected: proceduretype | undefined ;
  private URL = environment.procedureTypeApi;

  constructor(private http: HttpClient) { }

  getProceduresTypes(){
    return this.http.get(this.URL);
  }

  getProceduresTypesByLevel(level: String | any): Observable<proceduretype>{
    return this.http.get<proceduretype>(`${this.URL}/${level}`);
  }

}
