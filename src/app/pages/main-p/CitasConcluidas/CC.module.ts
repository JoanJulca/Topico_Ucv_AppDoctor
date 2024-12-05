import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CCPageRoutingModule } from './CC-routing.module';

import { CCPage } from './CC.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CCPageRoutingModule,
    SharedModule
  ],
  declarations: [CCPage]
})
export class CCPageModule {}
