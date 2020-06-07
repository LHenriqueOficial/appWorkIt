import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { AutentificacaoService } from './../../services/autentificacao.service';
import { Usuario } from 'src/app/Model/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loading: any;
  private usuario:Usuario={};

  constructor(
    private router: Router,
    public fbAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AutentificacaoService,

    )
   { }

  ngOnInit() {

    this.fbAuth.authState.subscribe(user=>{
      if (user)
      {
        console.log("autenticado: " + user.uid)
      }
      else{
        console.log("nao autenticado")
      }
    })
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.usuario);
      this.router.navigateByUrl("inicial")
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 8000 });
    toast.present();
  }


  showScreen(){
  
}

}
