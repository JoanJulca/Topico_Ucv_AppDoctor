import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },

  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/Doctor_welcome_App.module').then( m => m.Doctor_welcome_AppPageModule)
  },

  {
    path: 'main-p',
    loadChildren: () => import('./pages/main-p/main-p.module').then( m => m.MainPPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/main-p/reportes/reportes_Total.module').then( m => m.ReportesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
