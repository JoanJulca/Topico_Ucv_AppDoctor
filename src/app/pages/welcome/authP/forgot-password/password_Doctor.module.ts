import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { password_DoctorRoutingModule } from './password_Doctor-routing.module';

import { password_Doctor } from './password_Doctor.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    password_DoctorRoutingModule,
    SharedModule
  ],
  declarations: [password_Doctor]
})
export class password_DoctorModule {}
