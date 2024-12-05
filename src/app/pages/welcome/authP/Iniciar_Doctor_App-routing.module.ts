import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Iniciar_Doctor_AppPage } from './Iniciar_Doctor_App.page';

const routes: Routes = [
  {
    path: '',
    component: Iniciar_Doctor_AppPage
  },
  {
    path: 'Registrarse_Doctor_Log',
    loadChildren: () => import('./sign-up/Registrarse_Doctor_Log.module').then( m => m.Registrarse_Doctor_LogPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/password_Doctor.module').then( m => m.password_DoctorModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Iniciar_Doctor_AppPageRoutingModule {}
