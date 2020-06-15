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
  idColecao: string;
  usuario:any=[];

  constructor(
    private router:  Router,
    public fbAuth: AngularFireAuth,
    public db : AngularFirestore,
    private navCtrl: NavController,
    
  ) { this.carregaUser(); }

  ngOnInit() {
    // this.carregaUser();
  }
  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
  }

  rota(){
    this.router.navigate(['/edit-perfil', this.idColecao])
  
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
      let users=this.db.collection<Usuario>("Usuarios")
      users.ref.where("userId", "==", uid).get().then(result=>{
             result.forEach(doc =>{
               this.usuario.push(doc.data())
               console.log(doc.id, ' => ' , doc.data())
               this.nomeUser = doc.data().nome
               this.idColecao = doc.id
               console.log("id dacoleção do usuario " + this.idColecao)
             })
          })
 
    }
    else{
      console.log("nao autenticado")
      this.logOut();
    }
  })

}
}
