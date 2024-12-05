import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPPage } from './main-p.page';


const routes: Routes = [
  {
    path: '',
    component: MainPPage,
    children: [
  {
    path: 'CitasConcluidas'    ,loadChildren: () => import('./CitasConcluidas/CC.module').then( m => m.CCPageModule)
  },
  {
    path: 'profile',loadChildren: () => import('./profile/Perfil_Doctor_Cam.module').then( m => m.Perfil_Doctor_CamPageModule)
  },
  {
    path: 'reportes',loadChildren: () => import('./reportes/reportes_Total.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'CitasPendientes',loadChildren: () => import('./CitasPendientes/CP.module').then( m => m.CPPageModule)
  }

  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPPageRoutingModule {}
