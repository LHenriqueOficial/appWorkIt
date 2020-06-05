import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPessoalPage } from './perfil-pessoal.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPessoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPessoalPageRoutingModule {}
