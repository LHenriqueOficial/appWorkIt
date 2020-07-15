import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { Publicacao } from './../../Model/publicacao';
import { Subscription } from 'rxjs';
import { AreaAtuacao } from './../../Model/area-atuacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-publicacao',
  templateUrl: './detalhes-publicacao.component.html',
  styleUrls: ['./detalhes-publicacao.component.scss'],
})
export class DetalhesPublicacaoComponent implements OnInit {
  idPublicacao: string;
  idUser: any;
  public publicacao = new Array<Publicacao>();
  public:Publicacao ={};

  private publicacaoSubscription: Subscription;
  usuario: any;
 

  constructor(


    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private servicePublicacao: PublicacaoService,
    public navParams: NavParams,
    private router:  Router,
  ) {

    this.idUser= navParams.get('id')
    console.log(this.idUser);
    
 
   }

  ngOnInit() {
    this.loadPublicacao(this.idUser)
  }

  fecharModal(){
    this.modalCtrl.dismiss();
  }

  loadPublicacao( id:string){
    let lista=this.db.collection<Publicacao>("Publicacao")
    lista.ref.where("userId", "==" , id ).get().then(res =>{
     res.forEach(doc => {
       this.publicacao.push(doc.data())
       console.log(doc.id, ' => ' , doc.data())
       this.public.nomeUser= doc.data().nomeUser,
       this.public.areaAtuacao= doc.data().areaAtuacao,
       this.public.profissao= doc.data().profissao,
       this.public.tempoExperiencia= doc.data().tempoExperiencia,
       this.public.descricao= doc.data().descricao,
       this.public.tipoPublicacao= doc.data().tipoPublicacao,
       this.public.valorHora= doc.data().valorHora,
       this.public.dataPublicacao= doc.data().dataPublicacao,
       this.public.userId = doc.data().userId,
       console.log("valor hora" + this.public.valorHora)
       console.log("id publicação " + this.public.userId)  
     });
   })
      
  }

  rota(id:string){
    this.fecharModal();
    this.router.navigate(['/mensagens', id])
  }

}