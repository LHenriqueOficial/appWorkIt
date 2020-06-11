import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPessoalPageRoutingModule } from './perfil-pessoal-routing.module';

import { PerfilPessoalPage } from './perfil-pessoal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPessoalPageRoutingModule,
  ],
  declarations: [PerfilPessoalPage]
})
export class PerfilPessoalPageModule {}
