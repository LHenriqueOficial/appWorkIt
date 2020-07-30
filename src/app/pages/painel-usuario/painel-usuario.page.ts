import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PainelUsuario } from 'src/app/Model/painel-usuario';
import { PainelUsuarioService } from './../../services/painel-usuario.service';
import { DetalhesPublicacaoComponent } from 'src/app/components/detalhes-publicacao/detalhes-publicacao.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalhesPainelComponent } from './../../components/detalhes-painel/detalhes-painel.component';
import { Movimentacao } from './../../Model/movimentacao';
import { data } from 'jquery';
import { Publicacao } from './../../Model/publicacao';
import { MovimentacaoService } from './../../services/movimentacao.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-painel-usuario',
  templateUrl: './painel-usuario.page.html',
  styleUrls: ['./painel-usuario.page.scss'],
})
export class PainelUsuarioPage implements OnInit {
  private painelSubscription: Subscription;
  public userPainel = new Array<PainelUsuario>();
  public userPainel1 = new Array<PainelUsuario>();
  public publicacao = new Array<Publicacao>();
  public valorPublicacao: number;
  public idPublicacao:string;
  public idPainelUser: string;


  public usuarioPainel: PainelUsuario ={};
  public movimentacao: Movimentacao ={}


  userId: string;

  constructor(
    private painelUserService: PainelUsuarioService,
    private db: AngularFirestore,
    private  modalCtrl: ModalController,
    public fbAuth: AngularFireAuth,
    public moviService: MovimentacaoService,

  ) { 

    this.fbAuth.authState.subscribe(user=>{
      if (user){
        this.userId = user.uid;
        this.painelSubscription = this.painelUserService.getPainelUsers().subscribe(data =>{
         this.userPainel= data;
          
        })
     
      }
    }

    )}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.painelSubscription.unsubscribe();
  }

  iniciaServico(id:string, status: string){
  console.log(id)

  this.painelUserService.getPainelUser(id).subscribe(data =>{

    this.usuarioPainel = data;
    console.log(this.usuarioPainel);

    this.usuarioPainel.status=status;
    this.painelUserService.updatePainelUser(id,this.usuarioPainel);

    let lista=this.db.collection<Publicacao>("Publicacao")
         lista.ref.where("userId", "==", this.userId).get().then(res =>{        
          res.forEach(doc => {
            this.publicacao.push(doc.data())
            console.log(doc.id, ' => ' , doc.data())
            this.valorPublicacao = doc.data().valorHora,
            this.idPublicacao = doc.id; 
         })
         this.movimentacao.horaInicio = new Date().getTime();
         this.movimentacao.valorServico = this.valorPublicacao,
         this.movimentacao.idContratante= this.userId;
         this.movimentacao.idContratado = this.usuarioPainel.userId
         this.movimentacao.idPublicacao = this.idPublicacao
         this.movimentacao.situacao = "Em execucao"

         this.moviService.addMovimentacao(this.movimentacao);
        
        });
  });
  }

 
  finalizaServico(){

  }

  
  async showDetalhesPublicacao(id: string){
    const detalhe = await this.modalCtrl.create({
      // component:DetalhesPublicacaoComponent,
      component:DetalhesPainelComponent,
      cssClass: 'custom-modal-detalhes-publicacao',
      //passando parametro no component modal
      componentProps:{
        id:id
      }
    
    })
    detalhe.present();
    
  }


}
