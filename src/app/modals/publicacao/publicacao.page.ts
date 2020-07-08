import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.page.html',
  styleUrls: ['./publicacao.page.scss'],
})
export class PublicacaoPage implements OnInit {

  constructor(
    private  modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }
fecharModal(){
  this.modalCtrl.dismiss();
}
}
