import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesPainelPageRoutingModule } from './detalhes-painel-routing.module';

import { DetalhesPainelPage } from './detalhes-painel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesPainelPageRoutingModule
  ],
  declarations: [DetalhesPainelPage]
})
export class DetalhesPainelPageModule {}
