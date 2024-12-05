import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Doctor_welcome_AppPageRoutingModule } from './Doctor_welcome_App-routing.module';
import { Doctor_welcome_AppPage } from './Doctor_welcome_App.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Doctor_welcome_AppPageRoutingModule
  ],
  declarations: [Doctor_welcome_AppPage]
})
export class Doctor_welcome_AppPageModule {}
