import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateCitaComponent } from './components/add-update-cita/add-update-cita.component';
import { AddUpdateCitaDentistaComponent } from './components/add-update-cita-dentista/add-update-cita-dentista.component';
import { AddUpdateCitaFisioterapiaComponent } from './components/add-update-cita-fisioterapia/add-update-cita-fisioterapia.component';
import { AddUpdateCitaOculistaComponent } from './components/add-update-cita-oculista/add-update-cita-oculista.component';


@NgModule({
  declarations: [HeaderComponent,CustomInputComponent,LogoComponent,AddUpdateCitaComponent,AddUpdateCitaDentistaComponent, AddUpdateCitaOculistaComponent,
  AddUpdateCitaFisioterapiaComponent],
  exports:[HeaderComponent,CustomInputComponent,LogoComponent,ReactiveFormsModule,AddUpdateCitaComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
