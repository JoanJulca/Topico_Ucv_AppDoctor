import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Perfil_Doctor_CamPage } from './Perfil_Doctor_Cam.page';

const routes: Routes = [
  {
    path: '',
    component: Perfil_Doctor_CamPage
  },
  { path: 'terms', loadChildren: () => import('./terms/terms.module').then(m => m.TermsPageModule) },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Perfil_Doctor_CamPageRoutingModule {}
