import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Registrarse_Doctor_LogPageRoutingModule } from './Registrarse_Doctor_Log-routing.module';

import { Registrarse_Doctor_LogPage } from './Registrarse_Doctor_Log.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Registrarse_Doctor_LogPageRoutingModule,
    SharedModule
  ],
  declarations: [Registrarse_Doctor_LogPage]
})
export class Registrarse_Doctor_LogPageModule {}
