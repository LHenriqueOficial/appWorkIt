import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilProfissionalPage } from './perfil-profissional.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilProfissionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilProfissionalPageRoutingModule {}
