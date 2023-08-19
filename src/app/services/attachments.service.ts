import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AttachmentModel } from '../models/AttachmentModel';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  procedureSelected: AttachmentModel | undefined ;
  private url: string = environment.attachmentsApi;
  private url_proc: string = environment.procedureApi;

  constructor(private http: HttpClient) { }

    uploadImage(file: File): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': file.type
      });
  
      return this.http.post(`${this.url}/saveFile/`, file, {
        headers: headers
      });
    }
  
  saveAttachment(attachment: AttachmentModel){
    return this.http.post(`${this.url_proc}/attachment/`, attachment);
  }

  listImages() {
    return this.http.get(`${this.url}/listFiles`);
  }

  downloadImage(imageName : String): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'image/jpeg' });
    return this.http.get<Blob>(`${this.url}/downloadImage/${imageName}`, { headers, responseType: 'blob' as 'json' });
  }

  getAttachments(id: number | any): Observable<AttachmentModel>{
    return this.http.get<AttachmentModel>(`${this.url_proc}/attachment/${id}`);
  }

  getAttachment(name: String | any): Observable<AttachmentModel>{
    return this.http.get<AttachmentModel>(`${this.url}/url/${name}`);
  }

}
