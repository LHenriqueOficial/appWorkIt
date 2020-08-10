import { Component, OnInit } from '@angular/core';
import { Movimentacao } from 'src/app/Model/movimentacao';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { element } from 'protractor';
import { DetalhesPublicacaoComponent } from 'src/app/components/detalhes-publicacao/detalhes-publicacao.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio-movimentacao',
  templateUrl: './relatorio-movimentacao.page.html',
  styleUrls: ['./relatorio-movimentacao.page.scss'],
})
export class RelatorioMovimentacaoPage implements OnInit {

  listaMovimentacao: Observable<Movimentacao[]>
  public listaMoviment = new Array<Movimentacao>();
  lista: Observable<Movimentacao[]>
  usuarioLogado: string;
  contagem: number =0;
  total: number=0;
  totalMovimentado: number;


  constructor(
    private fbAuth:AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
   public db: AngularFirestore,
   private  modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.verificaLogin();
    this.listarMovimentacao();
  }

  verificaLogin(){
    this.fbAuth.authState.subscribe(user=>{
      if(user){
        this.usuarioLogado = user.uid
      }
    })
  }


  listarMovimentacao(){
    this.lista = this.db.collection<Movimentacao>("Movimentacao" , ref =>{
      return ref.limit(100).orderBy("horaInicio")
    }).valueChanges()/// faz a consulta ser dinamica toda vez que alterar a base de dados altera a view
    this.lista.subscribe(res =>
      {
      
      this.filtraLista(res)
      })
  }

  filtraLista(res){

    this.listaMoviment =res.filter(t=>(t.idContratante == this.usuarioLogado || t.idContratado == this.usuarioLogado) ) 
    
    console.log(this.listaMoviment);
    this.listaMoviment.forEach(element=>{
      this.contagem = this.contagem + 1;
      this.total = this.total + element.valorPagamento
      console.log(this.contagem);
      console.log(this.total)
    })
    this.totalMovimentado = Number.parseFloat(this.total.toFixed(2));
    console.log(this.totalMovimentado)
  }

  
  async showDetalhesPublicacao(id: string, pagina:string){
    console.log("nome da pagina enviada" + pagina);
    const detalhe = await this.modalCtrl.create({
      component:DetalhesPublicacaoComponent,
      cssClass: 'custom-modal',
      //passando parametro no component modal
      componentProps:{
        id:id,
        pagina:pagina
      }
    
    })
    detalhe.present();
    

  }
}


  

