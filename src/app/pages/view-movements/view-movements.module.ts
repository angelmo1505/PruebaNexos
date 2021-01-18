import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMovementsPageRoutingModule } from './view-movements-routing.module';

import { ViewMovementsPage } from './view-movements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMovementsPageRoutingModule
  ],
  declarations: [ViewMovementsPage]
})
export class ViewMovementsPageModule {}
