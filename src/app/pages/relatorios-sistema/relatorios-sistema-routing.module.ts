import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatoriosSistemaPage } from './relatorios-sistema.page';

const routes: Routes = [
  {
    path: '',
    component: RelatoriosSistemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatoriosSistemaPageRoutingModule {}
