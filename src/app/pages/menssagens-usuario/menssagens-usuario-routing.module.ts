import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenssagensUsuarioPage } from './menssagens-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: MenssagensUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenssagensUsuarioPageRoutingModule {}
