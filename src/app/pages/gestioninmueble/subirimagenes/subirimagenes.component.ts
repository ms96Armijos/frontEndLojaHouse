import { InmuebleService } from './../../../services/inmueble/inmueble.service';
import { Inmueble } from './../../../models/inmueble.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { SubirfotoinmuebleService } from 'src/app/services/inmueble/subirfotoinmueble.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';

@Component({
  selector: 'app-subirimagenes',
  templateUrl: './subirimagenes.component.html',
  styleUrls: ['./subirimagenes.component.css']
})
export class SubirimagenesComponent implements OnInit {

  imagenesInmueble=  [];

  inmuebleObtenido: [];
  fileArr = [];
  imgArr = [];
  fileObj = [];
  form: FormGroup;
  msg: string;
  progress: number = 0;

  id: string;

  inmuebles: Inmueble = new Inmueble(null, null, null, null, null, null, null, null, null);


  eliminarFoto(image: any) {
    const indice = this.fileArr.indexOf(image);

    //console.log('indice: ' + indice);
    this.fileArr.splice(indice, 1);
    this.imgArr.splice(indice, 1);
    this.fileObj.splice(indice, 1);
    //console.log(this.fileObj);
  }


  constructor(public toastr: ToastrService, public router: Router, public activatedRoute: ActivatedRoute, public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public subirFotosInmuebleService: SubirfotoinmuebleService,
    public _inmuebleService: InmuebleService,) {

      activatedRoute.params.subscribe(parametros => {
        this.id = parametros['idinmueble'];

        //console.log(this.id);
      });

    this.form = this.fb.group({
      imagen: [null]
    });



  }

  ngOnInit() {
    //this.obtenerImagenesInmueble();
    this.obtenerInmueble(this.id)
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
      //console.log(this.fileObj)
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
      //console.log(this.form.value.imagen)
      this.subirFotosInmuebleService.actualizarFotos(this.form.value.imagen, this.id)
        .subscribe((event: HttpEvent<any>) => {

          if (this.fileObj.length > 0 || this.fileObj !== null) {

            switch (event.type) {
              case HttpEventType.Sent:
                //console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                //console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                this.progress = Math.round(event.loaded / event.total * 100);
                //console.log(`¡Éxito! ${this.progress}%`);
                break;
              case HttpEventType.Response:

                //console.log('Imágenes cargadas exitosamente', event.body);
                this.toastr.success('Imágenes cargadas exitosamente');
                setTimeout(() => {
                  this.progress = 0;
                  this.fileArr = [];
                  this.fileObj = [];
                  this.msg = "Imágenes cargadas exitosamente"
                }, 3000);
            }
          } else {
            //console.log('No hay img');
            this.toastr.warning('No hay imágenes');
          }
          this.obtenerInmueble(this.id);
        });
    } else {
      //console.log('no hay imag');
      this.toastr.warning('No hay imágenes');
    }

    //this.router.navigate(['/crearinmueble', this.id]);
  }

  /*obtenerImagenesInmueble() {
    this.subirFotosInmuebleService.obtenerInmueble(this.id)
    .subscribe( inmueble => {
      this.inmuebles = inmueble;
      this.inmuebleObtenido = inmueble;
    });
  }*/

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  obtenerInmueble(id: string){
    this._inmuebleService.obtenerInmueble(id)
    .subscribe(inmueble => {
      this.inmuebles = inmueble;
      this.imagenesInmueble = inmueble.imagen;
    });

  }


 /* obtenerPhotosInmueble(){
    this.subirFotosInmuebleService.obtenerImagenes(this.id)
    .subscribe( images => {
      this.imagenesInmueble = []
      this.imagenesInmuebleObtenidas=[]
      this.imagenesInmuebleObtenidas = images;
      this.imagenesInmuebleObtenidas.forEach(element => {
        this.imagenesInmueble.push(element)
      });
    });
  }*/


  eliminarImagen( image: Inmueble ){
    //console.log('IMG: '+image['public_id'])
    swal({
      title: '¿Está seguro de borrar la imágen?',
      text: 'Está a punto de borrar la imágen',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          //console.log(image._id);
          //console.log(image['inmueble']);
          this.actualizarImg(image['inmueble'], image._id,)
          this.subirFotosInmuebleService.eliminarImagen(image['public_id'])
          .subscribe(borrado => {
            this.obtenerInmueble(this.id);
          });
        }
      });
  }


  //ELIMINAR FOTO(FUNCIONA CON EL OBJETO)
  /*eliminarImagen( image: Imagen ){
    swal({
      title: '¿Está seguro de borrar la imágen?',
      text: 'Está a punto de borrar la imágen',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          console.log(image._id);
          this.actualizarImg(image._id)
          this.subirFotosInmuebleService.eliminarImagen(image._id)
            .subscribe(borrado => {
              this.obtenerInmueble(this.id);
            });
        }
      });
  }*/

  actualizarImg(id: string, removeid: string){
    this.subirFotosInmuebleService.actualizarPathImagen(id, removeid)
    .subscribe(resp => {
      //console.log('imagen actualizada en DB')
    });
  }

  regresarPagina(){
    window.history.back();
  }
}
