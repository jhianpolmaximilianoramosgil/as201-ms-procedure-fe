import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttachmentModel } from 'src/app/models/AttachmentModel';
import { AttachmentsService } from 'src/app/services/attachments.service';
import { ActivatedRoute, Router } from '@angular/router';
export interface DialogData {
  id: number;
  name: String;
  procedureId: number;
  url: String;
  upload: boolean;
}

@Component({
  selector: 'app-dialog-attachments',
  templateUrl: './dialog-attachments.component.html',
  styleUrls: ['./dialog-attachments.component.css']
})
export class DialogAttachmentsComponent implements OnInit {

  attachment: AttachmentModel = new AttachmentModel();
  previewUrl: string | ArrayBuffer | null = null;
  selectedImage: File | null  = null;
  fileSelected: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private attachmentService: AttachmentsService, public dialogRef: MatDialogRef<DialogAttachmentsComponent>,public route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    console.log('este es mi fileseletc: ' + this.fileSelected)
  }

  


  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.fileSelected = true;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.fileSelected = false;
  }
  console.log('este es mi cuadro ' + this.fileSelected)
}

  uploadImage(prodId: number) {
    if (this.selectedImage) {
      this.attachmentService.uploadImage(this.selectedImage).subscribe(
        (response) => {
          console.log(response);
          console.log("Imagen Subida" + response);
          this.attachment.procedureId = prodId;
          this.attachment.imageId = response.name;
          this.attachmentService.saveAttachment(this.attachment).subscribe(
            (response) => {
              console.log('guardado exitosamente:', response);
              this.dialogRef.close();
              this.recargarComponente();
            },
            (error) => {
              console.error('Error al guardar', error);
            }
          );
        },
        (error) => {
          console.error(error);
          console.log("Error: " + error);
        }
      );
    }
  }
  
  Cerrar(): void {
    this.dialogRef.close();
  }
  
  recargarComponente(): void {
    console.log('se recarga componente')
    this.router.navigateByUrl('/viewRender', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/viewRender']);
    });
  }

}
