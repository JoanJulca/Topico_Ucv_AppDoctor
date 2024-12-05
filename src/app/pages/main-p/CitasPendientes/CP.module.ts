import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CPPageRoutingModule } from './CP-routing.module';

import { CPPage } from './CP.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CPPageRoutingModule,
    SharedModule
  ],
  declarations: [CPPage]
})
export class CPPageModule {}
