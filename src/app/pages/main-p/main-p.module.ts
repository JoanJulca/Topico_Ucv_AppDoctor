import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainPPageRoutingModule } from './main-p-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainPPage } from './main-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPPageRoutingModule,
    SharedModule
  ],
  declarations: [MainPPage]
})
export class MainPPageModule {}
