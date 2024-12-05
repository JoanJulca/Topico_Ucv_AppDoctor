import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Perfil_Doctor_CamPageRoutingModule } from './Perfil_Doctor_Cam-routing.module';

import { Perfil_Doctor_CamPage } from './Perfil_Doctor_Cam.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Perfil_Doctor_CamPageRoutingModule,
    SharedModule
  ],
  declarations: [Perfil_Doctor_CamPage]
})
export class Perfil_Doctor_CamPageModule {}
