import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/Model/usuario';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from './../../services/usuario.service';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-perfil-pessoal',
  templateUrl: './perfil-pessoal.page.html',
  styleUrls: ['./perfil-pessoal.page.scss'],
})
export class PerfilPessoalPage implements OnInit {
  public usuario: Usuario= {};
  idUser: string;
  id: any;
  public usuarioSubscription: Subscription
  loading: HTMLIonLoadingElement;
  public listEstados: Array<string>=[ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", 
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"]


  constructor(
    private router:  Router,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private usuarioService:  UsuarioService,
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

  // ngOnDestroy() {
  //   this.usuarioSubscription.unsubscribe();
  // }

  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }

  loadUser() {
    this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data;
    });
  }



  async updateUser(){

    this.usuario.statusPerfilPessoal='completado';
    this.usuarioService.updateUsuario(this.id, this.usuario) 
    
      await this.presentLoading();
      this.usuarioService.updateUsuario(this.id, this.usuario).then(async () => {
      await this.loading.dismiss();
      const alert = await this.AlertCtrl.create({
        header: 'Aviso',
        subHeader: '',
        message: 'Usuário Aletrado com Sucesso',
        buttons: ['Ok']
      });
      await alert.present();
      await this.ngOnInit();

    }).catch( async ()=>{
      const alert = await this.AlertCtrl.create({
        header:'Aviso',
        subHeader:'',
        message:'Erro ao Cadastrar Usuário',
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
