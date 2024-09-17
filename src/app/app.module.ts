import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { ReferenciasMaterialModule } from './referencias-material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EmpresaEditarComponent } from './componentes/empresa-editar/empresa-editar.component';
import { DecidirComponent } from './componentes/decidir/decidir.component';
import { TituloComponent } from './componentes/titulo/titulo.component';
import { LoginComponent } from './componentes/login/login.component';
import { TituloEditarComponent } from './componentes/titulo-editar/titulo-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaComponent,
    EmpresaEditarComponent,
    DecidirComponent,
    TituloComponent,
    TituloEditarComponent, 
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
