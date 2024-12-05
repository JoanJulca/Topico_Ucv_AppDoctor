import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Doctor_welcome_AppPage } from './Doctor_welcome_App.page';

const routes: Routes = [
  {
    path: '',
    component: Doctor_welcome_AppPage
  },
  {
    path: 'authP',
    loadChildren: () => import('./authP/Iniciar_Doctor_App.module').then( m => m.Iniciar_Doctor_AppPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./authP/sign-up/Registrarse_Doctor_Log.module').then( m => m.Registrarse_Doctor_LogPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Doctor_welcome_AppPageRoutingModule {}
