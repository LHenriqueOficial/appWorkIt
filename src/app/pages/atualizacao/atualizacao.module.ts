import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizacaoPageRoutingModule } from './atualizacao-routing.module';

import { AtualizacaoPage } from './atualizacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtualizacaoPageRoutingModule
  ],
  declarations: [AtualizacaoPage]
})
export class AtualizacaoPageModule {}
