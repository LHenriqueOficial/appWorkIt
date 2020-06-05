import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DadosFinanceirosPageRoutingModule } from './dados-financeiros-routing.module';

import { DadosFinanceirosPage } from './dados-financeiros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DadosFinanceirosPageRoutingModule
  ],
  declarations: [DadosFinanceirosPage]
})
export class DadosFinanceirosPageModule {}
