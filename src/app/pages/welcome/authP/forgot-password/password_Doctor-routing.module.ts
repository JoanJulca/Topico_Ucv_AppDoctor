import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { password_Doctor } from './password_Doctor.page';

const routes: Routes = [
  {
    path: '',
    component: password_Doctor
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class password_DoctorRoutingModule {}
