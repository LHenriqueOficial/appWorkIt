import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/Model/usuario';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsuarioService } from './../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {
  nomeUser: any;
  idUser: string;
  public usuario: Usuario = {};
  user: any = []

  private usuarioSubscription: Subscription;
  id: any;

  constructor(
    private router:  Router,
    public fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.id = this.activatedRoute.snapshot.params['id'];
    console.log("teste id parametro "+ this.id)
    if (this.id) this.loadUser();

   }

  ngOnInit() {
    this.carregaUser();
  }

  loadUser() {
    this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data;
    });
  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
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
        console.log("autenticado: " + user.uid)
        uid = user.uid;
        this.idUser = uid;
        console.log("teste uid  " + uid)
        let users=this.db.collection<Usuario>("Usuarios")
        users.ref.where("userId", "==", uid).get().then(result=>{
               result.forEach(element =>{
                 this.nomeUser=element.data().nome
                 this.id= element.data().userId
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
