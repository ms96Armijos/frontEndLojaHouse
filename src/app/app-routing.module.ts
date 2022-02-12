import { LoginComponent } from './pages/login/iniciarsesion/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { RegistroComponent } from './pages/login/registro/registro.component';
import { ReseteopasswordComponent } from './pages/login/reseteopassword/reseteopassword.component';
import { InmueblepublicoComponent } from './pages/inmueblepublico/inmueblepublico.component';
import { Page404Component } from './shared/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnviarmensajeComponent } from './pages/enviarmensaje/enviarmensaje.component';


const appRoutes: Routes = [

  { path: 'principal', component: PrincipalComponent, data: {titulo: 'Página principal'}},
  { path: 'login', component: LoginComponent, data: {titulo: 'Inicio de sesión'}},
  { path: 'registro', component: RegistroComponent, data: {titulo: 'Registro de usuario'}},
  { path: 'reseteopassword', component: ReseteopasswordComponent, data: {titulo: 'Reseteo Contraseña'} },
  { path: 'enviarmensaje', component: EnviarmensajeComponent, data: {titulo: 'Enviar mensaje'} },
  { path: 'ver-inmueble-publico/:idinmueble', component: InmueblepublicoComponent, data: { titulo: 'Ver inmueble' } },
  //{ path: '', redirectTo: '/principal', pathMatch: 'full'},

  //{path: '', component: PagesComponent, canActivate: [LoginGuardGuard], loadChildren: './pages/pages.module#PagesModule'},
  { path: '**', component: Page404Component},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
