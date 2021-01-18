import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenerateqrPageRoutingModule } from './generateqr-routing.module';
import { GenerateqrPage } from './generateqr.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    GenerateqrPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [GenerateqrPage]
})
export class GenerateqrPageModule {}
