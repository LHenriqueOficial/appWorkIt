import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatoriosSistemaPageRoutingModule } from './relatorios-sistema-routing.module';

import { RelatoriosSistemaPage } from './relatorios-sistema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatoriosSistemaPageRoutingModule
  ],
  declarations: [RelatoriosSistemaPage]
})
export class RelatoriosSistemaPageModule {}
