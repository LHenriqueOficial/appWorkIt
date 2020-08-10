import { Component, OnInit } from '@angular/core';
import { Publicacao } from './../../Model/publicacao';
import { Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { CardComponent } from 'src/app/components/card/card.component';
import { ModalController } from '@ionic/angular';
import { DetalhesPublicacaoComponent } from './../../components/detalhes-publicacao/detalhes-publicacao.component';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.page.html',
  styleUrls: ['./atualizacao.page.scss'],
})
export class AtualizacaoPage implements OnInit {
  public publicacao = new Array<Publicacao>();
  private publicacaoSubscription: Subscription
  idPublicacao: string;
  userId: string;


  constructor(
    private db: AngularFirestore,
    private  modalCtrl: ModalController,
    public fbAuth: AngularFireAuth,

  ) { }

  ngOnInit() {
    this.carregaPublicacoes();
  }

  carregaPublicacoes() {
    let lista=this.db.collection<Publicacao>("Publicacao")
   
     lista.ref.orderBy("dataPublicacao", "desc" ).get().then(res =>{
      
      res.forEach(doc => {
        this.publicacao.push(doc.data())
        console.log(doc.id, ' => ' , doc.data())
        this.idPublicacao = doc.id;
        console.log("id publicação " + this.idPublicacao)  
      });
    })

    this.fbAuth.authState.subscribe(user=>{
      if (user)
      {
        this.userId = user.uid;
      }})
  }


  async showDetalhesPublicacao(id: string){
    const detalhe = await this.modalCtrl.create({
      component:DetalhesPublicacaoComponent,
      cssClass: 'custom-modal',
      //passando parametro no component modal
      componentProps:{
        id:id
      }
    
    })
    detalhe.present();
    

  }

  

}
