import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenssagensUsuarioPageRoutingModule } from './menssagens-usuario-routing.module';

import { MenssagensUsuarioPage } from './menssagens-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenssagensUsuarioPageRoutingModule
  ],
  declarations: [MenssagensUsuarioPage]
})
export class MenssagensUsuarioPageModule {}
