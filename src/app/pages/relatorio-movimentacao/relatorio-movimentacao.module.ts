import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioMovimentacaoPageRoutingModule } from './relatorio-movimentacao-routing.module';

import { RelatorioMovimentacaoPage } from './relatorio-movimentacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioMovimentacaoPageRoutingModule
  ],
  declarations: [RelatorioMovimentacaoPage]
})
export class RelatorioMovimentacaoPageModule {}
