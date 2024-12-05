import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CCPage } from './CC.page';

const routes: Routes = [
  {
    path: '',
    component: CCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CCPageRoutingModule {}
