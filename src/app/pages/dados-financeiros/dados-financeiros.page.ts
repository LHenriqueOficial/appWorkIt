import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/Model/usuario';
import { Subscription } from 'rxjs';
import { ContaUserService } from 'src/app/services/conta-user.service';
import { ContaRecebimento } from './../../Model/conta-recebimento';
import { CartaoPagamento } from './../../Model/cartao-pagamento';
import { Formacao } from './../../Model/formacao';
import { ContaUser } from './../../Model/conta-user';


@Component({
  selector: 'app-dados-financeiros',
  templateUrl: './dados-financeiros.page.html',
  styleUrls: ['./dados-financeiros.page.scss'],
})
export class DadosFinanceirosPage implements OnInit {
  public usuario: Usuario= {};
  public recebimento: ContaRecebimento={};
  public listRecebimento: ContaRecebimento;
  public pagamento: CartaoPagamento={};
  public listPagamento:CartaoPagamento ;

  idUser: string;
  id: any;
  alteraTela :number=1;
  public usuarioSubscription: Subscription
  public contaUserSubscription: Subscription
  loading: any;
  public listBanco: Array<string>=[ "001 – Banco do Brasil S.A", "033 – Banco Santander (Brasil) S.A.", "104 – Caixa Econômica Federal",
   "237 – Banco Bradesco S.A.", "341 – Banco Itaú S.A.", "389 – Banco Mercantil do Brasil S.A.",
    "399 – HSBC Bank Brasil S.A. – Banco Múltiplo", "422 – Banco Safra S.A.", "453 – Banco Rural S.A.",
     "633 – Banco Rendimento S.A.","652 – Itaú Unibanco Holding S.A.", "745 – Banco Citibank S.A."]
  idUserPainel: any;
  constructor(
    private router:  Router,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private usuarioService: UsuarioService,
    private contaService: ContaUserService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private AlertCtrl: AlertController,
  ) { 
    this.id = this.activatedRoute.snapshot.params['id'];
    this.idUserPainel = this.activatedRoute.snapshot.params['idUserPainel'];
    if(this.idUserPainel){
      this.alteraTela = 2;
      console.log(this.alteraTela);
    }
    
    console.log("teste id parametro "+ this.id)
    if (this.id) this.loadUser();
  }

  ngOnInit() {
  }
  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
    // this.contaUserSubscription.unsubscribe();
  }
 
  loadUser() {
    this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data;
      this.listRecebimento =  data.contaRecebimento;
      this.recebimento.nomeTitular = this.listRecebimento.nomeTitular;
      this.recebimento.banco = this.listRecebimento.banco;
      this.recebimento.tipoConta = this.listRecebimento.tipoConta;
      this.recebimento.agencia = this.listRecebimento.agencia;
      this.recebimento.numeroConta = this.listRecebimento.numeroConta;
      this.recebimento.digito = this.listRecebimento.digito;
      ///////////////////////////////
      console.log(this.listRecebimento)
      this.listPagamento = data.cartaoPagamento;
      this.pagamento.nomeTitular = this.listPagamento?.nomeTitular;
      this.pagamento.cpf = this.listPagamento?.cpf;
      this.pagamento.numeroCartao = this.listPagamento?.numeroCartao;
      this.pagamento.dataValidade = this.listPagamento?.dataValidade;
      this.pagamento.codigoValidacao = this.listPagamento?.codigoValidacao;
      console.log(this.listPagamento);

    });
  }


  async updateDadosRecebimento(){
    
    var user = await this.db.collection("Usuarios").doc(this.id);
 
 user.update({
  "contaRecebimento.nomeTitular": this.recebimento.nomeTitular,
  "contaRecebimento.tipoConta": this.recebimento.tipoConta,
  "contaRecebimento.banco": this.recebimento.banco, 
  "contaRecebimento.agencia": this.recebimento.agencia, 
  "contaRecebimento.numeroConta": this.recebimento.numeroConta,
  "contaRecebimento.digito": this.recebimento.digito, 

}).then(async function() {   
  
  console.log("Document successfully updated!");
}).catch(async function(error) {
  
  console.error("Error updating document: ", error);
 
})
  }

  async updateDadosPagamento(){
    
    var user = await this.db.collection("Usuarios").doc(this.id);
 
    user.update({
     "cartaoPagamento.nomeTitular": this.pagamento.nomeTitular,
     "cartaoPagamento.numeroCartao": this.pagamento.numeroCartao,
     "cartaoPagamento.cpf": this.pagamento.cpf, 
     "cartaoPagamento.dataValidade": this.pagamento.dataValidade, 
     "cartaoPagamento.codigoValidacao": this.pagamento.codigoValidacao,
     
   }).then(async function() {   
     
     console.log("Document successfully updated!");
   }).catch(async function(error) {
     
     console.error("Error updating document: ", error);
    
   })
    
  }

   updateDadosPagamento2(){

    
    var user =  this.db.collection("Usuarios").doc(this.id);
 
    user.update({
     "cartaoPagamento.nomeTitular": this.pagamento.nomeTitular,
     "cartaoPagamento.numeroCartao": this.pagamento.numeroCartao,
     "cartaoPagamento.cpf": this.pagamento.cpf, 
     "cartaoPagamento.dataValidade": this.pagamento.dataValidade, 
     "cartaoPagamento.codigoValidacao": this.pagamento.codigoValidacao,
     
   }).then(function()  {   
     
     console.log("Document successfully updated!");

    
   }).catch(async function(error) {
     
     console.error("Error updating document: ", error);
    
   })
   this.router.navigate(['/detalhes-painel',this.idUserPainel])

  }



  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
    
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }

}
