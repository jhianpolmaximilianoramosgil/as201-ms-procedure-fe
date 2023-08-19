import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  imageData: string | ArrayBuffer | null = null;
  hash: string | undefined;
  loading = false;
  
  constructor(
    private router: Router,
  
  ) { }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.loading = true; // Activar la carga
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageData = e.target?.result as string;
        this.generateHash(this.selectedFile!); // Use ! to assert that selectedFile is not null
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  btnEnviarHash(){
    this.router.navigate(['/procedure']).then();
  }




  async generateHash(file: File) {
    setTimeout(async () => {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const hashBuffer = await crypto.subtle.digest('SHA-256', uint8Array);
  
      let hashHex = '';
      new Uint8Array(hashBuffer).forEach(byte => {
        const hex = byte.toString(16).padStart(2, '0');
        hashHex += hex;
      });
  
      this.hash = hashHex;
      this.loading = false; // Desactivar la carga una vez que el hash esté listo
    }, 5000); // 5000 milisegundos = 5 segundos
  }


}
