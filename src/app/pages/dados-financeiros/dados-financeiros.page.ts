import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/Model/usuario';
import { Subscription } from 'rxjs';
import { ContaUserService } from 'src/app/services/conta-user.service';


@Component({
  selector: 'app-dados-financeiros',
  templateUrl: './dados-financeiros.page.html',
  styleUrls: ['./dados-financeiros.page.scss'],
})
export class DadosFinanceirosPage implements OnInit {
  public usuario: Usuario= {};
  idUser: string;
  id: any;
  public usuarioSubscription: Subscription
  public contaUserSubscription: Subscription
  loading: any;
  public listBanco: Array<string>=[ "001 – Banco do Brasil S.A", "033 – Banco Santander (Brasil) S.A.", "104 – Caixa Econômica Federal",
   "237 – Banco Bradesco S.A.", "341 – Banco Itaú S.A.", "389 – Banco Mercantil do Brasil S.A.",
    "399 – HSBC Bank Brasil S.A. – Banco Múltiplo", "422 – Banco Safra S.A.", "453 – Banco Rural S.A.",
     "633 – Banco Rendimento S.A.","652 – Itaú Unibanco Holding S.A.", "745 – Banco Citibank S.A."]
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
    this.contaUserSubscription.unsubscribe();
  }
 
  loadUser() {
    this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data;
    });
  }


  async updateConta(){
    
      await this.presentLoading();
      this.usuarioService.updateUsuario(this.id, this.usuario).then(async () => {
      await this.loading.dismiss();
      const alert = await this.AlertCtrl.create({
        header: 'Aviso',
        subHeader: '',
        message: 'Conta Aletrada com Sucesso',
        buttons: ['Ok']
      });
      await alert.present();
      await this.ngOnInit();

    }).catch( async ()=>{
      const alert = await this.AlertCtrl.create({
        header:'Aviso',
        subHeader:'',
        message:'Erro ao Cadastrar Conta',
        buttons: ['Ok']
      });
      await alert.present();       
    })   
  
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
