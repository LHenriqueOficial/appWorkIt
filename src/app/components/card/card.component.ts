import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  tipoPublicacao:string;

  constructor(
    private  modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }
fecharModal(){
  this.modalCtrl.dismiss();
}
}
