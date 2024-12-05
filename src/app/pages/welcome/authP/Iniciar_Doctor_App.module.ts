import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Iniciar_Doctor_AppPageRoutingModule } from './Iniciar_Doctor_App-routing.module';

import { Iniciar_Doctor_AppPage } from './Iniciar_Doctor_App.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Iniciar_Doctor_AppPageRoutingModule,
    SharedModule
  ],
  declarations: [Iniciar_Doctor_AppPage]
})
export class Iniciar_Doctor_AppPageModule {}
