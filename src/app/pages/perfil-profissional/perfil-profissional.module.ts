import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilProfissionalPageRoutingModule } from './perfil-profissional-routing.module';

import { PerfilProfissionalPage } from './perfil-profissional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilProfissionalPageRoutingModule
  ],
  declarations: [PerfilProfissionalPage]
})
export class PerfilProfissionalPageModule {}
