import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CPPage } from './CP.page';

const routes: Routes = [
  {
    path: '',
    component: CPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CPPageRoutingModule {}
