import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { collaboratorModel } from '../models/CollaboratorModel';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private URL = environment.personApi;
  constructor(private http: HttpClient) { 

  }
  


}
