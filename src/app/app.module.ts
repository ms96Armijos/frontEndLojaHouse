import { PipesModule } from './pipes/pipes.module';
import { CambiopasswordComponent } from './login/cambiopassword/cambiopassword.component';
import { RegistroComponent } from './login/registro/registro.component';
import { ReseteopasswordComponent } from './login/reseteopassword/reseteopassword.component';


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
import { LoginComponent } from './login/login.component';
import { VerPasswordDirective } from './login/ver-password.directive';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginapublicaComponent } from './paginapublica/paginapublica.component';
import { InmueblepublicoComponent } from './inmueblepublico/inmueblepublico.component';
import { EnviarmensajeComponent } from './enviarmensaje/enviarmensaje.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReseteopasswordComponent,
    RegistroComponent,
    VerPasswordDirective,
    CambiopasswordComponent,
    PaginapublicaComponent,
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
