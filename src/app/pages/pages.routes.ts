import { DashadminComponent } from './dashboard/dashadmin/dashadmin.component';
import { DasharrendatarioComponent } from './dashboard/dasharrendatario/dasharrendatario.component';
import { DashboardComponent } from './dashboard/dasharrendador/dashboard.component';
import { ArrendatarioGuard } from './../services/guards/arrendatario.guard';
import { ArrendadorAdminGuard } from './../services/guards/arrendador.admin.guard';
import { VercontratoComponent } from './contrato/vercontrato/vercontrato.component';
import { VermensajeComponent } from './admin/mensaje/vermensaje/vermensaje.component';
import { MensajesComponent } from './admin/mensaje/mensajes/mensajes.component';
import { ArrendadorGuard } from './../services/guards/arrendador.guard';
import { VervisitaComponent } from './visita/arrendador/vervisita/vervisita.component';
import { AcuerdoComponent } from './contrato/acuerdo/acuerdo.component';
import { AdminverinmuebleComponent } from './admin/adminseccionarrendador/adminverinmueble/adminverinmueble.component';
import { ContratosadminComponent } from './admin/adminseccionarrendatario/contratosadmin/contratosadmin.component';
import { VisitasadminComponent } from './admin/adminseccionarrendatario/visitasadmin/visitasadmin.component';
import { ListarusuarioarrendatarioComponent } from './admin/adminseccionarrendatario/listarusuarioarrendatario/listarusuarioarrendatario.component';
import { AdmincontratosComponent } from './admin/adminseccionarrendador/admincontratos/admincontratos.component';
import { AdminvisitasComponent } from './admin/adminseccionarrendador/adminvisitas/adminvisitas.component';
import { AdmininmueblesComponent } from './admin/adminseccionarrendador/admininmuebles/admininmuebles.component';
import { ListausuariosComponent } from './admin/adminseccionarrendador/listausuarios/listausuarios.component';
import { SubirimagenesComponent } from './gestioninmueble/subirimagenes/subirimagenes.component';
import { Page403Component } from './../shared/page403/page403.component';
import { AdminGuard } from './../services/guards/admin.guard';
import { ContratoarrendatarioComponent } from './contrato/contratoarrendatario/contratoarrendatario.component';
import { PlantillaComponent } from './contrato/plantilla/plantilla.component';
import { NuevoComponent } from './contrato/nuevo/nuevo.component';
import { VercontratosComponent } from './contrato/vercontratos/vercontratos.component';
import { VervisitasrealizadasComponent } from './visita/arrendatario/vervisitasrealizadas/vervisitasrealizadas.component';
import { ListavisitaarrendatarioComponent } from './visita/arrendatario/listavisitaarrendatario/listavisitaarrendatario.component';
import { CrearvisitaComponent } from './visita/arrendatario/crearvisita/crearvisita.component';
import { ListadovisitasComponent } from './visita/arrendador/listadovisitas/listadovisitas.component';
import { CrearservicioComponent } from './admin/serviciosbasicos/crearservicio/crearservicio.component';
import { CrearinmuebleComponent } from './gestioninmueble/crearinmueble/crearinmueble.component';
import { ListarinmueblesComponent } from './gestioninmueble/listarinmuebles/listarinmuebles.component';
import { CambiopasswordComponent } from './login/cambiopassword/cambiopassword.component';
import { PerfilComponent } from './login/perfil/perfil.component';
import { PagesComponent } from './../pages/pages.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../services/service.index';
import { ServiciosbasicosComponent } from './admin/serviciosbasicos/serviciosbasicos.component';
import { InmublespublicadosComponent } from './gestioninmueble/inmublespublicados/inmublespublicados.component';
import { AlquilarinmuebleComponent } from './gestioninmueble/alquilarinmueble/alquilarinmueble.component';



const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      //
      { path: 'dashboard', component: DashboardComponent, canActivate: [ArrendadorGuard], data: { titulo: 'ARRENDADOR'}},
      { path: 'dasharrendatario', component: DasharrendatarioComponent, canActivate: [ArrendatarioGuard], data: { titulo: 'ARRENDATARIO'}},
      { path: 'dashadmin', component: DashadminComponent, canActivate: [AdminGuard], data: { titulo: 'ADMINISTRADOR'}},
      //Listado de los bienes inmuebles registrados por un usuario arrendador:
      { path: 'inmuebles', component: ListarinmueblesComponent, canActivate: [ArrendadorGuard], data: { titulo: 'Listado de inmuebles disponibles' } },
      //Crear nuevos bienes inmuebles de acuerdo a un usuario arrendador específico:
      { path: 'crearinmueble/:idinmueble', component: CrearinmuebleComponent, canActivate: [ArrendadorGuard], data: { titulo: 'Crear inmueble' } },
      //Listado de solicitudes que le llegan al usuario arrendador:
      { path: 'visitas', component: ListadovisitasComponent, canActivate: [ArrendadorGuard], data: { titulo: 'Solicitudes de visitas' } },
      //Ver la visita solicitada a todo detalle
     // { path: 'vervisita/:idvisita', component: VervisitaComponent, canActivate: [ArrendadorAdminGuard], data: { titulo: 'Visita solicitada' } },
      //El usuario arrendatario puede crear una visita a partir de un inmueble publicado en la pantalla principal:
      { path: 'crearvisita/:idinmueble', component: CrearvisitaComponent,  canActivate: [ArrendatarioGuard], data: { titulo: 'Crear visita' } },
      //
      { path: 'vercontrato', component: VercontratosComponent, canActivate: [ArrendadorGuard], data: { titulo: 'Lista de contratos' } },
      //visualizar un contrato específico
      { path: 'visualizarcontrato/:idcontrato', component: VercontratoComponent, canActivate: [ArrendadorAdminGuard], data: { titulo: 'Contrato' } },
      //
      { path: 'crearcontrato/:idvisita', component: NuevoComponent, canActivate: [ArrendadorGuard], data: { titulo: 'Crear contrato' } },
      //
      { path: 'plantillacontrato/:idcontrato', component: PlantillaComponent, data: { titulo: 'Plantilla contrato' } },
      //
      { path: 'alquilar/:idinmueble', component: AlquilarinmuebleComponent, canActivate: [ArrendadorGuard], data: { titulo: 'Alquilar un inmueble' } },
      //
      { path: 'publicados', component: InmublespublicadosComponent, canActivate: [ArrendadorGuard], data: { titulo: 'Inmuebles pulicados' } },
      //
      { path: 'contratoarrendatario', component: ContratoarrendatarioComponent, canActivate: [ArrendatarioGuard], data: { titulo: 'Contratos' } },
      //
      { path: 'subirfotosinmueble/:idinmueble', component: SubirimagenesComponent, canActivate: [ArrendadorGuard], data: { titulo: 'Subir imágenes del inmueble' } },
      //
      { path: 'noautorizado', component: Page403Component, data: { titulo: 'No autorizado' } },
      //
      { path: 'acuerdo/:idcontrato', component: AcuerdoComponent, canActivate: [ArrendatarioGuard], data: { titulo: 'Estado del contrato' } },



      //SECCIÓN ADMINISTRADOR-ARRENDATARIO
      { path: 'arrendatario-usuario', component: ListarusuarioarrendatarioComponent, canActivate: [AdminGuard],data: { titulo: 'Usuarios arrendatarios registrados' } },
      //{ path: 'arrendatario-contratos', component: ContratoarrendatarioComponent, data: {titulo: 'Contratos del arrendatario'} },
      { path: 'arrendatario-visitas/:idusuario', component: VisitasadminComponent, canActivate: [AdminGuard], data: { titulo: 'Visitas registradas' } },
      { path: 'arrendatario-contratos/:idusuario', component: ContratosadminComponent, canActivate: [AdminGuard], data: { titulo: 'Contratos registradas' } },


      //SECCIÓN ADMIN-ARRENDADOR
      { path: 'arrendador-usuario', component: ListausuariosComponent, canActivate: [AdminGuard], data: { titulo: 'Usuarios arrendadores registrados' } },
      { path: 'arrendador-inmuebles/:idusuario', component: AdmininmueblesComponent, canActivate: [AdminGuard], data: { titulo: 'Inmuebles registrados' } },
      { path: 'arrendador-visitas/:idusuario', component: AdminvisitasComponent, canActivate: [AdminGuard], data: { titulo: 'Visitas registradas' } },
      { path: 'arrendador-contratos/:idusuario', component: AdmincontratosComponent, canActivate: [AdminGuard], data: { titulo: 'Contratos registradas' } },
      { path: 'arrendador-ver-inmueble/:idinmueble', component: AdminverinmuebleComponent, data: { titulo: 'Ver inmueble' } },

      //SECCIÓN MENSAJES
      { path: 'mensajes', component: MensajesComponent, canActivate: [AdminGuard], data: { titulo: 'Mensajes recibidos' } },
      { path: 'ver-mensaje/:idmensaje', component: VermensajeComponent, canActivate: [AdminGuard], data: { titulo: 'Mensaje' } },



      //ARRENDATARIO
      //listado de solicitudes realizadas por parte del usuario arrendatario:
      { path: 'visitas-arrendatario', component: ListavisitaarrendatarioComponent, canActivate: [ArrendatarioGuard], data: { titulo: 'Visitas solicitadas' } },
      //obtengo una visita del arrendatario para que pueda visualizarla:
      { path: 'ver-visitas-arrendatario/:idvisita', component: VervisitasrealizadasComponent, canActivate: [ArrendatarioGuard], data: { titulo: 'Visita solicitada' } },




      //RUTAS DEL USUARIO, SU PERFIL
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
      { path: 'cambiarpassword', component: CambiopasswordComponent, data: { titulo: 'Cambiar Contraseña' } },

      //CONFIGURACIONES DEL ADMIN, CONTROL DE USUARIOS Y SERVICIOS
      //{ path: 'usuarios', component: VerusuariosComponent, canActivate: [AdminGuard], data: { titulo: 'Lista de usuarios' } },
      { path: 'servicios', component: ServiciosbasicosComponent, canActivate: [AdminGuard], data: { titulo: 'Lista de servicios básicos' } },
      { path: 'crearservicio/:idservicio', component: CrearservicioComponent, canActivate: [AdminGuard], data: { titulo: 'Crear servicio' } },



      { path: '', redirectTo: '/principal', pathMatch: 'full' },
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
