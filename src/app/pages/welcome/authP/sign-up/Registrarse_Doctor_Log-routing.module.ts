import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Registrarse_Doctor_LogPage } from './Registrarse_Doctor_Log.page';

const routes: Routes = [
  {
    path: '',
    component: Registrarse_Doctor_LogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Registrarse_Doctor_LogPageRoutingModule {}
