import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesPage_TotalRoutingModule } from './reportes_Total-routing.module';

import { Reportes_TotalPage } from './reportes_Total.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesPage_TotalRoutingModule,
    SharedModule
  ],
  declarations: [Reportes_TotalPage]
})
export class ReportesPageModule {}
