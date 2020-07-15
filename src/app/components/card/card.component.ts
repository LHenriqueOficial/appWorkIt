import { Component} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { Usuario } from 'src/app/Model/usuario';
import { AngularFirestore } from 'angularfire2/firestore';
import { Publicacao } from './../../Model/publicacao';
import { PublicacaoService } from 'src/app/services/publicacao.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  tipoPublicacao:string;
  nomeUser: string;
  sobreNome: string;
  profissao: string;
  idColecao: string;
  usuario:any=[];
  areaAtuacao: any;
  experiencia: any;
  userId: string;
  public publicacao: Publicacao={};
  // public ordem = new Array<Ordem>();
  dadosAtualizacao: string;


  constructor(
    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private servicePublicacao: PublicacaoService,
    public navParams: NavParams,
  ) {
    this.dadosAtualizacao= navParams.get('id')
    console.log(this.dadosAtualizacao);
   }

  ngOnInit() {
  
    this.carregaUser();
  }
fecharModal(){
  this.modalCtrl.dismiss();
}

carregaUser(){

  this.fbAuth.authState.subscribe(user=>{
    if (user)
    {
     this.userId = user.uid;
      let users=this.db.collection<Usuario>("Usuarios")
      users.ref.where("userId", "==", this.userId).get().then(result=>{
             result.forEach(doc =>{
               this.usuario.push(doc.data())
               console.log(doc.id, ' => ' , doc.data())
               this.nomeUser = doc.data().nome,
               this.sobreNome = doc.data().sobrenome,
               this.profissao = doc.data().profissao.descricao,
               this.areaAtuacao = doc.data().profissao.areaAtuacao,
               this.experiencia = doc.data().profissao.tempoExperiencia
               this.idColecao = doc.id
               console.log("id dacoleção do usuario " + this.idColecao)
             })
        })
 
    }

  })

}

carregaPublicacao(){


      let users=this.db.collection<Publicacao>("Publicacao")
      users.ref.where("userId", "==", this.userId).get().then(result=>{
             result.forEach(doc =>{
               this.usuario.push(doc.data())
               console.log(doc.id, ' => ' , doc.data())
               this.nomeUser = doc.data().nome,
               this.sobreNome = doc.data().sobrenome,
               this.profissao = doc.data().profissao.descricao,
               this.areaAtuacao = doc.data().profissao.areaAtuacao,
               this.experiencia = doc.data().profissao.tempoExperiencia
               this.idColecao = doc.id
               console.log("id dacoleção do usuario " + this.idColecao)
             })
        })
 
}


async salvaPublicacao(){
  console.log(this.publicacao)
this.publicacao.userId = this.userId;
this.publicacao.dataPublicacao = new Date().getTime();
  await this.servicePublicacao.addPublicacao(this.publicacao);
  this.modalCtrl.dismiss();
}
}
