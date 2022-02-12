import { VerPasswordDirective } from './directive/ver-password.directive';
import { LoginComponent } from './pages/login/iniciarsesion/login.component';
import { PipesModule } from './pipes/pipes.module';
import { CambiopasswordComponent } from './pages/login/cambiopassword/cambiopassword.component';
import { RegistroComponent } from './pages/login/registro/registro.component';
import { ReseteopasswordComponent } from './pages/login/reseteopassword/reseteopassword.component';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//RUTAS PRINCIPALES
import { APP_ROUTES } from './app-routing.module';

//MODULOS DE LAS PÁGINAS
import { PagesModule } from './pages/pages.module';

//SERVICIOS
import { ServiceModule } from "./services//service.module";


//COMPONENTES
import { AppComponent } from './app.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InmueblepublicoComponent } from './pages/inmueblepublico/inmueblepublico.component';
import { EnviarmensajeComponent } from './pages/enviarmensaje/enviarmensaje.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReseteopasswordComponent,
    RegistroComponent,
    VerPasswordDirective,
    CambiopasswordComponent,
    InmueblepublicoComponent,
    EnviarmensajeComponent
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    PipesModule,
    PagesModule,
    ServiceModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
