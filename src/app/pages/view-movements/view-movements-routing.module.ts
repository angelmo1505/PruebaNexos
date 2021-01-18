import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMovementsPage } from './view-movements.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMovementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMovementsPageRoutingModule {}
