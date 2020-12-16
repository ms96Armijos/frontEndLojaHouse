import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { SubirfotoinmuebleService } from 'src/app/services/inmueble/subirfotoinmueble.service';

@Component({
  selector: 'app-subirimagenes',
  templateUrl: './subirimagenes.component.html',
  styleUrls: ['./subirimagenes.component.css']
})
export class SubirimagenesComponent implements OnInit {

  inmuebleObtenido: [];
  fileArr = [];
  imgArr = [];
  fileObj = [];
  form: FormGroup;
  msg: string;
  progress: number = 0;

  id: string;


  eliminarFoto(image: any) {
    const indice = this.fileArr.indexOf(image);

    console.log('indice: ' + indice);
    this.fileArr.splice(indice, 1);
    this.imgArr.splice(indice, 1);
    this.fileObj.splice(indice, 1);
    console.log(this.fileObj);
  }


  constructor(public router: Router, public activatedRoute: ActivatedRoute, public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public subirFotosInmuebleService: SubirfotoinmuebleService) {

      activatedRoute.params.subscribe(parametros => {
        this.id = parametros['idinmueble'];

        console.log(this.id);
      });

    this.form = this.fb.group({
      imagen: [null]
    });



  }

  ngOnInit() {
    //this.obtenerImagenesInmueble();
  }

  upload(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url });
    });
    this.fileObj = [];
    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item);
      console.log(this.fileObj)
    });

    // Set files form control
    this.form.patchValue({
      imagen: this.fileObj
    });
    this.form.get('imagen').updateValueAndValidity();
  }

  actualizar() {
    // Upload to server

    if (this.form.value.imagen !== null && this.form.value.imagen.length > 0) {

      //console.log('aca para despues')
      console.log(this.form.value.imagen)
      this.subirFotosInmuebleService.actualizarFotos(this.form.value.imagen, this.id)
        .subscribe((event: HttpEvent<any>) => {

          if (this.fileObj.length > 0 || this.fileObj !== null) {

            switch (event.type) {
              case HttpEventType.Sent:
                console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                this.progress = Math.round(event.loaded / event.total * 100);
                console.log(`¡Éxito! ${this.progress}%`);
                break;
              case HttpEventType.Response:

                console.log('Imágenes cargadas exitosamente', event.body);
                setTimeout(() => {
                  this.progress = 0;
                  this.fileArr = [];
                  this.fileObj = [];
                  this.msg = "Imágenes cargadas exitosamente"
                }, 3000);
            }
          } else {
            console.log('No hay img');
          }
        });
    } else {
      console.log('no hay imag');
    }

    //this.router.navigate(['/crearinmueble', this.id]);
  }

  obtenerImagenesInmueble() {
    this.subirFotosInmuebleService.obtenerInmueble(this.id)
    .subscribe( inmueble => {
      this.inmuebleObtenido = inmueble;
    });
  }

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
