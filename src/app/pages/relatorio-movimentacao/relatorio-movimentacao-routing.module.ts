import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioMovimentacaoPage } from './relatorio-movimentacao.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioMovimentacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioMovimentacaoPageRoutingModule {}
