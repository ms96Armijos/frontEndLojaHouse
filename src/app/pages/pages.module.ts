import { AdmininmueblesComponent } from './admin/adminseccionarrendador/admininmuebles/admininmuebles.component';
import { CrearservicioComponent } from './admin/serviciosbasicos/crearservicio/crearservicio.component';
import { InterceptorService } from './../interceptors/interceptor.service';
import { PipesModule } from './../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { VerusuariosComponent } from './admin/verusuarios/verusuarios.component';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { ServiciosbasicosComponent } from './admin/serviciosbasicos/serviciosbasicos.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrearinmuebleComponent } from './gestioninmueble/crearinmueble/crearinmueble.component';
import { ListarinmueblesComponent } from './gestioninmueble/listarinmuebles/listarinmuebles.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListadovisitasComponent } from './visita/arrendador/listadovisitas/listadovisitas.component';
import { CrearvisitaComponent } from './visita/arrendatario/crearvisita/crearvisita.component';
import { PrincipalComponent } from './principal/principal.component';
import { VervisitasrealizadasComponent } from './visita/arrendatario/vervisitasrealizadas/vervisitasrealizadas.component';
import { ListavisitaarrendatarioComponent } from './visita/arrendatario/listavisitaarrendatario/listavisitaarrendatario.component';
import { VercontratosComponent } from './contrato/vercontratos/vercontratos.component';
import { PlantillaComponent } from './contrato/plantilla/plantilla.component';
import { NuevoComponent } from './contrato/nuevo/nuevo.component';
import { AlquilarinmuebleComponent } from './inmueble/alquilarinmueble/alquilarinmueble.component';
import { InmublespublicadosComponent } from './inmueble/inmublespublicados/inmublespublicados.component';
import { ContratoarrendatarioComponent } from './contrato/contratoarrendatario/contratoarrendatario.component';
import { SubirimagenesComponent } from './gestioninmueble/subirimagenes/subirimagenes.component';
import { SubirimagenesDirective } from './gestioninmueble/subirimagenes/subirimagenes.directive';
import { ListausuariosComponent } from './admin/adminseccionarrendador/listausuarios/listausuarios.component';
import { AdminvisitasComponent } from './admin/adminseccionarrendador/adminvisitas/adminvisitas.component';
import { AdmincontratosComponent } from './admin/adminseccionarrendador/admincontratos/admincontratos.component';
import { VisitasadminComponent } from './admin/adminseccionarrendatario/visitasadmin/visitasadmin.component';
import { ContratosadminComponent } from './admin/adminseccionarrendatario/contratosadmin/contratosadmin.component';
import { ListarusuarioarrendatarioComponent } from './admin/adminseccionarrendatario/listarusuarioarrendatario/listarusuarioarrendatario.component';
import { AdminverinmuebleComponent } from './admin/adminseccionarrendador/adminverinmueble/adminverinmueble.component';
import { AcuerdoComponent } from './contrato/acuerdo/acuerdo.component';
import { VervisitaComponent } from './visita/arrendador/vervisita/vervisita.component';
import { MensajesComponent } from './mensaje/mensajes/mensajes.component';
import { VermensajeComponent } from './mensaje/vermensaje/vermensaje.component';
import { VercontratoComponent } from './contrato/vercontrato/vercontrato.component';
import { TagInputModule } from 'ngx-chips';


/*import {MatChipsModule} from '@angular/material/chips'

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule, MatIconModule } from '@angular/material';*/


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ServiciosbasicosComponent,
    InmuebleComponent,
    VerusuariosComponent,
    PerfilComponent,
    CrearinmuebleComponent,
    ListarinmueblesComponent,
    CrearservicioComponent,
    ListadovisitasComponent,
    CrearvisitaComponent,
    PrincipalComponent,
    VervisitasrealizadasComponent,
    ListavisitaarrendatarioComponent,
    VercontratosComponent,
    PlantillaComponent,
    NuevoComponent,
    AlquilarinmuebleComponent,
    InmublespublicadosComponent,
    ContratoarrendatarioComponent,
    SubirimagenesComponent,
    SubirimagenesDirective,
    ListausuariosComponent,
    AdmininmueblesComponent,
    AdminvisitasComponent,
    AdmincontratosComponent,
    VisitasadminComponent,
    ContratosadminComponent,
    ListarusuarioarrendatarioComponent,
    AdminverinmuebleComponent,
    AcuerdoComponent,
    VervisitaComponent,
    MensajesComponent,
    VermensajeComponent,
    VercontratoComponent,
  ],
  exports: [
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    PipesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    TagInputModule,
    /*MatChipsModule,
    MatIconModule,
    MatFormFieldModule,*/
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  /*schemas: [ CUSTOM_ELEMENTS_SCHEMA ],*/

})
export class PagesModule { }
