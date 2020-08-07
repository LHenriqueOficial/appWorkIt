import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from './Model/usuario';
import { AngularFirestore } from 'angularfire2/firestore';
import { ContaUser } from './Model/conta-user';
import { resourceUsage } from 'process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  usuario: any=[];
  contaUser:any[];
  nomeUser: string;
  sobreNome: string;
  idColecao: string;
  email: string;
  saldo: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public fbAuth: AngularFireAuth,
    public db: AngularFirestore,
    private router:  Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.carregaUser();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
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
                 this.nomeUser = doc.data().nome,
                 this.sobreNome =doc.data().sobrenome,
                 this.email = doc.data().email,
                 this.idColecao = doc.id
                 console.log("id dacoleção do usuario " + this.idColecao)
               })
            })

            let userConta = this.db.collection<ContaUser>("ContaUser")
            userConta.ref.where("idConta", "==", uid).get().then(result =>{
              result.forEach(doc =>{
                this.usuario.push(doc.data())
                this.saldo =doc.data().saldo;
              })
            })
   
      }
    
    })
  
  }

  showPage(nomePagina){
    this.router.navigateByUrl(nomePagina);
  }
  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }

}
