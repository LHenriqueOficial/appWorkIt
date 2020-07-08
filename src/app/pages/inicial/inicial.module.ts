import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicialPageRoutingModule } from './inicial-routing.module';

import { InicialPage } from './inicial.page';
import { PublicacaoPage } from './../../modals/publicacao/publicacao.page';
import { CardComponent } from 'src/app/components/card/card.component';


@NgModule({
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    InicialPageRoutingModule
  ],
  declarations: [InicialPage, PublicacaoPage, CardComponent],
  entryComponents: [PublicacaoPage, CardComponent]
})
export class InicialPageModule {}
