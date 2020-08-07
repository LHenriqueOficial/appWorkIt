import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PainelUsuario } from 'src/app/Model/painel-usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { PainelUsuarioService } from 'src/app/services/painel-usuario.service';
import { Movimentacao } from 'src/app/Model/movimentacao';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { ContaUserService } from 'src/app/services/conta-user.service';
import { ContaSistemaService } from 'src/app/services/conta-sistema.service';
import { ContaUser } from 'src/app/Model/conta-user';
import { Usuario } from 'src/app/Model/usuario';
import { ContaSistema } from 'src/app/Model/conta-sistema';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.page.html',
  styleUrls: ['./pagamentos.page.scss'],
})
export class PagamentosPage implements OnInit {
  idPainelUser: string;
  userPainel: PainelUsuario={};
  private painelUserSubscription: Subscription;
  private movimentacaoSubscription: Subscription;
  private contaSubscription: Subscription;
  private contaSistemaSubscription: Subscription;
  idContradado: string;
  public movi = new Array<Movimentacao>();
  movimentacao: Movimentacao={};
  usuario= new Array<Usuario>();
  contaSistema = new Array<ContaSistema>();
  contaSistem: ContaSistema={};
  contaUser = new Array<ContaUser>();
  conta:ContaUser={};
  idMovimentacao: string;
  idColecaoUsuario: string;
  numeroCartao: any;
  codigoValidacao: any;
  dataValidade: any;
  nomeTitular: any;
  cpf: any;
  cartaPagamento: any;
  idContaUser: string;
  idContaSistema: string;
  result: string;
  loading: HTMLIonLoadingElement;



  constructor
  (
    private activatedRoute: ActivatedRoute,
    private servicePainelUser: PainelUsuarioService,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private usuarioService: UsuarioService,
    private servicePublicacao: PublicacaoService,
    public AlertCtrl :AlertController,
    private movimentacaoService: MovimentacaoService,
    private contaService: ContaUserService,
    private contaSistemaService: ContaSistemaService,
    private router:  Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { 

    this.idPainelUser = this.activatedRoute.snapshot.params['id'];
    console.log(this.idPainelUser);
    this.painelUserSubscription= this.servicePainelUser.getPainelUser(this.idPainelUser).subscribe(data =>{
      this.userPainel = data;
      console.log(this.userPainel)
      this.idContradado = this.userPainel.userId;
      console.log(this.idContradado)
      this.carregaUser();
      this.loadMovimentacao();
      this.carregaContaUsuarioContratado()
    })

  }

  ngOnInit() {

  
    this.carregaContaSistema();

  }

  loadMovimentacao(){

    this.userPainel.idUsuariologado;
    this.userPainel.userId;
    let lista=this.db.collection<Movimentacao>("Movimentacao")
    lista.ref.where("idContratante", "==" , this.userPainel.idUsuariologado).where("idContratado", "==" ,this.userPainel.userId).get().then(res =>{
     res.forEach(doc => {
       this.movi.push(doc.data())
       console.log(doc.id, ' => ' , doc.data())
       this.idMovimentacao= doc.id
     
     });

     this.movimentacaoSubscription = this.movimentacaoService.getMovimentacao(this.idMovimentacao).subscribe(data =>{
       this.movimentacao = data;
    
    
     })
   })   
  }

 async EfetuarPagamento(){
  await this.presentLoading();
  
    if(this.numeroCartao && this.nomeTitular && this.dataValidade
      && this.cpf && this.codigoValidacao){
        console.log("dados cartao ok ")
      

        this.atualizaSaldoUsuario();
        this.atualizaSaldoSistema(this.movimentacao.taxaServico)
        this.movimentacao.statusPagamento = 'Efetuado';
        this.userPainel.status ='Finalizado e pago';

        this.servicePainelUser.updatePainelUser(this.idPainelUser, this.userPainel)
        this.movimentacaoService.updateMovimentacao(this.idMovimentacao, this.movimentacao)
        await this.alertaPagamentoEfetuado();
        
      }else{
        console.log("não é possivel efetuar pagamento");
        this.alertaDadosPagamento();
        this.result = "nao validado"
        this.router.navigate(['/dados-financeiros', this.idColecaoUsuario,this.idPainelUser])
      }
      this.loading.dismiss();
  }
  
  atualizaSaldoUsuario(){

     console.log(this.conta)
      let valor = this.conta.saldo;
      console.log(valor) 
      this.conta.saldo = valor + this.movimentacao.valorPagamento;
      console.log(this.conta.saldo);
    this.contaService.updateConta(this.idContaUser, this.conta)

  }


 carregaContaUsuarioContratado(){
    let lista=this.db.collection<ContaUser>("ContaUser")
    lista.ref.where("idConta", "==" , this.userPainel.userId).get().then(res =>{
     res.forEach(doc => {
       this.contaUser.push(doc.data())
       console.log(doc.id, ' => ' , doc.data())
       this.idContaUser= doc.id
       console.log(this.idContaUser)
     });
     this.contaSubscription = this.contaService.getConta(this.idContaUser).subscribe(data =>{
       this.conta = data;
      
  
     })
   
  
    })
   
   
  }


  atualizaSaldoSistema(valor: number){
    let saldo = this.contaSistem.saldo
    console.log(this.contaSistem.saldo)
    this.contaSistem.saldo = valor + saldo;
  
    console.log(this.contaSistem.saldo);
  
    this.contaSistemaService.updateContaSistema(this.idContaSistema, this.contaSistem);
  }

  carregaContaSistema(){
    this.idContaSistema = 'Na5G7dajhmXVj7JeAlIw'
    
    this.contaSistemaSubscription = this.contaSistemaService.getContaSistema(this.idContaSistema).subscribe(data=>{
    this.contaSistem = data;
    console.log(this.contaSistem);
    
    })
      
    }


  carregaUser(){
  
    this.fbAuth.authState.subscribe(user=>{
      if (user)
      {
        let uid = user.uid;
        let users=this.db.collection<Usuario>("Usuarios")
        users.ref.where("userId", "==", uid).get().then(result=>{
               result.forEach(doc =>{
                 this.usuario.push(doc.data())
                 console.log(doc.id, ' => ' , doc.data())
                 this.idColecaoUsuario = doc.id
                 this.numeroCartao = doc.data().cartaoPagamento.numeroCartao,
                 this.codigoValidacao = doc.data().cartaoPagamento.codigoValidacao,
                 this.dataValidade = doc.data().cartaoPagamento.dataValidade,
                 this.nomeTitular = doc.data().cartaoPagamento.nomeTitular,
                 this.cpf = doc.data().cartaoPagamento.cpf,
                 
                 console.log(this.cartaPagamento)
                 console.log("id dacoleção do usuario " + this.idColecaoUsuario)
               }) 
               
            })
      }
    })
  
  }

  async alertaDadosPagamento(){
    const alert = await this.AlertCtrl.create({
      header:'Aviso ',
      subHeader:'',
      message:'Completar dados de Pagamento',
      buttons: ['Ok']
    });
    await alert.present();
      }

      async alertaPagamentoEfetuado(){
        const alert = await this.AlertCtrl.create({
          header:'Aviso ',
          subHeader:'',
          message:'Pagamento efetuado com sucesso.',
          buttons: ['Ok']
        });
        await alert.present();
          }

      async presentToast(message: string) {
        const toast = await this.toastCtrl.create({ message, duration: 2000 });
        toast.present();
      }

      async presentLoading() {
        this.loading = await this.loadingCtrl.create({
          spinner: null,
          duration: 5000,
          message: 'Please wait...',
          translucent: true,
          
          });
        return this.loading.present();
      }
    

  }

