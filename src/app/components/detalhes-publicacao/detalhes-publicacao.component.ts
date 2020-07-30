import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { Publicacao } from './../../Model/publicacao';
import { Subscription } from 'rxjs';
import { AreaAtuacao } from './../../Model/area-atuacao';
import { Router } from '@angular/router';
import { PainelUsuario } from './../../Model/painel-usuario';
import { PainelUsuarioService } from './../../services/painel-usuario.service';

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
  userPainel: PainelUsuario={};

  private publicacaoSubscription: Subscription;
  usuario: any;
  userId: string;
  valor: boolean = true;
 

  constructor(


    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private servicePublicacao: PublicacaoService,
    private servicePainelUser: PainelUsuarioService,
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
       this.idPublicacao = doc.id
     });

     this.fbAuth.authState.subscribe(user=>{
      if (user)
      {
        this.userId = user.uid;
        if(this.userId == this.public.userId){
          console.log("id igual ")
          this.valor= true
          console.log(this.valor)

        }else{
          this.valor= false
          console.log(this.valor)
        }
      }
   
    })
  
   })
      
  }

  addUserPainel(){
    // this.fbAuth.authState.subscribe(user=>{
    //   this.userPainel.idUsuariologado = user.uid
    
    // })
    this.userPainel.idUsuariologado = this.userId
    this.userPainel.nomeUser= this.public.nomeUser,
    this.userPainel.areaAtuacao = this.public.areaAtuacao,
    this.userPainel.profissao = this.public.profissao,
    this.userPainel.tempoExperiencia = this.public.tempoExperiencia,
    this.userPainel.descricao = this.public.descricao,
    this.userPainel.tipoPublicacao = this.public.tipoPublicacao,
    this.userPainel.valorHora =this.public.valorHora,
    this.userPainel.dataPublicacao = this.public.dataPublicacao,
    this.userPainel.userId = this.public.userId,
    this.userPainel.idPublicacao = this.idPublicacao;

    this.servicePainelUser.addPainelUser(this.userPainel).then(async function() {   
  
      console.log("Usuario adcionado ao Painel com sucesso");
    }).catch(async function(error) {
      
      console.error("Erro ao adcionar ao Painel : ", error);
    
    })

    this.modalCtrl.dismiss();
   
  }

  rota(id:string){
    this.fecharModal();
    this.router.navigate(['/mensagens', id])
  }

}