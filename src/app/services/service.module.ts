import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebarService, UsuarioService, LoginGuardGuard,
   SubirarchivoService, ServiciosbasicosService, ContratoService, VisitaService, EnviarmensajeService } from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirarchivoService,
    ServiciosbasicosService,
    ContratoService,
    VisitaService,
    EnviarmensajeService,
  ],
})
export class ServiceModule {}
