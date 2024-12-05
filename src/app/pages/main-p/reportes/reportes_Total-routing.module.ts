import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Reportes_TotalPage } from './reportes_Total.page';

const routes: Routes = [
  {
    path: '',
    component: Reportes_TotalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesPage_TotalRoutingModule {}
