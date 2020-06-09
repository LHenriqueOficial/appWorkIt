import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from 'src/app/Model/usuario';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage implements OnInit {
  nomeUser: any;
  idUser: string;

  constructor(
    private router:  Router,
    public fbAuth: AngularFireAuth,
    public db : AngularFirestore,
    private navCtrl: NavController,
    
  ) { }

  ngOnInit() {
    this.carregaUser();
  }
  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
  }

  rota(){
    this.router.navigate(['/edit-perfil', this.idUser])
  
  }

  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }

carregaUser(){

  this.fbAuth.authState.subscribe(user=>{
    if (user)
    {
      let uid = user.uid;
      this.idUser = uid;
      console.log("autenticado: " + user.uid)
      uid = user.uid;
      console.log("teste uid  " + uid)
      let users=this.db.collection<Usuario>("Usuarios")
      users.ref.where("userId", "==", uid).get().then(result=>{
             result.forEach(element =>{
               this.nomeUser=element.data().nome
               console.log("teste uid  " + this.nomeUser)
             })
          })
    }
    else{
      console.log("nao autenticado")
    }
  })

}
}
