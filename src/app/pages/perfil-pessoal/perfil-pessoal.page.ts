import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/Model/usuario';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-perfil-pessoal',
  templateUrl: './perfil-pessoal.page.html',
  styleUrls: ['./perfil-pessoal.page.scss'],
})
export class PerfilPessoalPage implements OnInit {
  public usuario: Usuario= {};
  idUser: string;

  constructor(
    private router:  Router,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private userSevice:  UsuarioService,
  ) { }

  ngOnInit() {

    this.carregaUser();
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
      }
      else{
        console.log("nao autenticado")
      }
    })
  
  }

  login(){
    console.log(" id  = " +this.idUser);
  this.userSevice.updateOrdem(this.idUser, this.usuario)
this.ngOnInit();
  }

}
