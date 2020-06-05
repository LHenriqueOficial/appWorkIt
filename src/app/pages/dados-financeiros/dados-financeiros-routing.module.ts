import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DadosFinanceirosPage } from './dados-financeiros.page';

const routes: Routes = [
  {
    path: '',
    component: DadosFinanceirosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DadosFinanceirosPageRoutingModule {}
