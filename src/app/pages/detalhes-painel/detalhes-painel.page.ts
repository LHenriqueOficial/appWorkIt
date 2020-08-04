import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { PainelUsuarioService } from 'src/app/services/painel-usuario.service';
import { Movimentacao } from 'src/app/Model/movimentacao';
import { Publicacao } from 'src/app/Model/publicacao';
import { PainelUsuario } from 'src/app/Model/painel-usuario';
import { Subscription, Observable } from 'rxjs';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { Usuario } from './../../Model/usuario';
import { ContaUser } from './../../Model/conta-user';
import { ContaUserService } from './../../services/conta-user.service';
import { ContaSistema } from 'src/app/Model/conta-sistema';
import { ContaSistemaService } from 'src/app/services/conta-sistema.service';

@Component({
  selector: 'app-detalhes-painel',
  templateUrl: './detalhes-painel.page.html',
  styleUrls: ['./detalhes-painel.page.scss'],
})
export class DetalhesPainelPage implements OnInit {
  idPublicacao: string;
  idUser: any;
  public movi = new Array<Movimentacao>();
  lista: Observable<Movimentacao[]>;
  detalheMovimentacao: Observable<Movimentacao[]>;

  public:Publicacao ={};
  userPainel: PainelUsuario={};
  movimentacao: Movimentacao={};
  contaUser = new Array<ContaUser>();
  contaSistema = new Array<ContaSistema>();
  contaSistem: ContaSistema={};
  conta:ContaUser={};
  idMovimentacao: string;
  horaAtual: number;
  horaDecorrida: any;
  horaInicio: number;
  calculoAtual: any;
  valorServico: number;
  idContradado: string;
  porcentagemSistema: number;

  private publicacaoSubscription: Subscription;
  private painelUserSubscription: Subscription;
  private movimentacaoSubscription: Subscription;
  private contaSubscription: Subscription;
  private contaSistemaSubscription: Subscription;
  idContaUser: string;
  idPainelUser: any;
  idContaSistema: any;
  
  // usuario: any;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private servicePublicacao: PublicacaoService,
    private servicePainelUser: PainelUsuarioService,
    private movimentacaoService: MovimentacaoService,
    private contaService: ContaUserService,
    private contaSistemaService: ContaSistemaService,
    private router:  Router,
  ) { 

    
    this.idPainelUser = this.activatedRoute.snapshot.params['id'];
    console.log(this.idPainelUser);
    this.painelUserSubscription= this.servicePainelUser.getPainelUser(this.idPainelUser).subscribe(data =>{
      this.userPainel = data;
      console.log(this.userPainel)
      this.idContradado = this.userPainel.userId;
      console.log(this.idContradado)

      this.loadMovimentacao();
    })
  }
  
  ngOnInit() {
    
  }

  loadMovimentacao(){

    this.userPainel.idUsuariologado;
    this.userPainel.userId;
    let lista=this.db.collection<Movimentacao>("Movimentacao")
    lista.ref.where("idContratante", "==" , this.userPainel.idUsuariologado).where("idContratado", "==" ,this.userPainel.userId).get().then(res =>{
     res.forEach(doc => {
       this.movi.push(doc.data())
       console.log(doc.id, ' => ' , doc.data())
       this.idMovimentacao= doc.id,
       this.horaInicio = doc.data().horaInicio,
       this.valorServico = doc.data().valorServico
       console.log(this.horaInicio)
     });
     this.horaAtual = new Date().getTime()
     console.log(this.horaAtual)
     console.log(this.horaInicio)
     this.horaDecorrida = Number ((this.horaAtual - this.horaInicio)/ 1000 / 60/60 ).toFixed(2)
     console.log(this.horaDecorrida)
     this.calculoAtual = Number (this.horaDecorrida * this.valorServico).toFixed(2);
     console.log(this.calculoAtual);

     this.movimentacaoSubscription = this.movimentacaoService.getMovimentacao(this.idMovimentacao).subscribe(data =>{
       this.movimentacao = data;
     
      
     })
   })   
  }


  rota(id:string){
    // this.fecharModal();
    this.router.navigate(['/mensagens', id])
  }

teste(){
   let lista=this.db.collection<Movimentacao>("Movimentacao")
  lista.ref.where("idContratante", "==" , this.userPainel.idUsuariologado).where("idContratato", "==" ,this.idContradado).get().then(res =>{
   res.forEach(doc => {
     this.movi.push(doc.data())
     console.log(doc.id, ' => ' , doc.data())
     this.idMovimentacao= doc.id,
     this.horaInicio = doc.data().horaInicio,
     this.valorServico = doc.data().valorServico
     console.log(this.horaInicio)
   });
  })

  // citiesRef.where('state', '==', 'CA').where('population', '>', 1000000);

}
 


  listarMovimentacao(){
    this.lista = this.db.collection<Movimentacao>("Movimentacao" , ref =>{
      return ref
    }).valueChanges()/// faz a consulta ser dinamica toda vez que alterar a base de dados altera a view
    this.lista.subscribe(res =>
      {
      this.filtraLista(res)
      })
  }

  filtraLista(res){

    // this.listamensagens =res.filter(t=>(t.de == this.usuarioDe && t.para == this.usuarioPara)|| t.para == this.usuarioDe && t.de == this.usuarioPara ) 
    this.detalheMovimentacao = res.filter(t=>(t.idContratante == this.userPainel.idUsuariologado && t.idContratado == this.idContradado))

    console.log(this.detalheMovimentacao);
    this.detalheMovimentacao
  }

  finalizaMovimentacao(){
this.carregaContaSistema();

    this.movimentacao.horaFinal = new Date().getTime();
    this.horaDecorrida =  Number ((this.movimentacao.horaFinal - this.movimentacao.horaInicio)/1000 / 60/60).toFixed(2);
    this.movimentacao.valorPagamento = Number (this.horaDecorrida * this.valorServico);
    this.movimentacao.porcetagemSistema = this.contaSistem.porcentagem;
    this.movimentacao.horasTrabalhadas = this.horaDecorrida;
     console.log(this.movimentacao.valorPagamento);
     this.movimentacao.status = 'Finalizado'
     console.log(this.movimentacao.status);

    //  atualiza conta usuario contratado
     this.atualizaSaldoUsuario();

    //  atualiza painel usuario
    this.userPainel.status = 'Finalizado'
    // this.servicePainelUser.updatePainelUser(this.idPainelUser,this.userPainel);

  }
atualizaSaldoUsuario(){
  let lista=this.db.collection<ContaUser>("ContaUser")
  lista.ref.where("idConta", "==" , this.userPainel.userId).get().then(res =>{
   res.forEach(doc => {
     this.contaUser.push(doc.data())
     console.log(doc.id, ' => ' , doc.data())
     this.idContaUser= doc.id
   });
   this.contaSubscription = this.contaService.getConta(this.idContaUser).subscribe(data =>{
     this.conta = data;
     console.log(this.contaSistem.porcentagem);
    
     this.porcentagemSistema  = Number ((this.contaSistem.porcentagem * this.movimentacao.valorPagamento)/ 100);
     console.log(this.porcentagemSistema)
     let valor: number = this.conta.saldo;
    this.conta.saldo = Number((this.movimentacao.valorPagamento - this.porcentagemSistema) + valor)
    console.log(this.conta.saldo)
     console.log( this.contaSistem.saldo)

     this.atualizaSaldoSistema(this.porcentagemSistema)
   })
 

  // this.contaService.updateConta(this.idContaUser, this.conta)
  })
}

carregaContaSistema(){
this.idContaSistema = 'Na5G7dajhmXVj7JeAlIw'

this.contaSistemaSubscription = this.contaSistemaService.getContaSistema(this.idContaSistema).subscribe(data=>{
this.contaSistem = data;
console.log(this.contaSistem);

})
  
}



atualizaSaldoSistema(valor: number){
  let saldo = this.contaSistem.saldo
  console.log(this.contaSistem.saldo)
  this.contaSistem.saldo = valor + saldo;

  console.log(this.contaSistem.saldo);

  // this.contaSistemaService.updateContaSistema(this.idContaSistema, this.contaSistem);
}



}
