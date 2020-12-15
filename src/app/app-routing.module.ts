import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { ReseteopasswordComponent } from './login/reseteopassword/reseteopassword.component';
import { PaginapublicaComponent } from './paginapublica/paginapublica.component';
import { InmueblepublicoComponent } from './inmueblepublico/inmueblepublico.component';
import { Page404Component } from './shared/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [

  { path: 'principal', component: PrincipalComponent, data: {titulo: 'Página principal'}},
  { path: 'login', component: LoginComponent, data: {titulo: 'Inicio de sesión'}},
  { path: 'registro', component: RegistroComponent, data: {titulo: 'Registro de usuario'}},
  { path: 'reseteopassword', component: ReseteopasswordComponent, data: {titulo: 'Reseteo Contraseña'} },
  { path: 'verinmueblepublico/:idinmueble', component: PaginapublicaComponent, data: {titulo: 'Detalle del inmueble'} },
  { path: 'ver-inmueble-publico/:idinmueble', component: InmueblepublicoComponent, data: { titulo: 'Ver inmueble' } },
  //{ path: '', redirectTo: '/principal', pathMatch: 'full'},
  { path: '**', component: Page404Component},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
