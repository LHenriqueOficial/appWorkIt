import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesPainelPage } from './detalhes-painel.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesPainelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesPainelPageRoutingModule {}
