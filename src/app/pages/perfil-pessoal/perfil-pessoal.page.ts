import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil-pessoal',
  templateUrl: './perfil-pessoal.page.html',
  styleUrls: ['./perfil-pessoal.page.scss'],
})
export class PerfilPessoalPage implements OnInit {

  constructor(
    private router:  Router,
    public fbAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }
  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }
}
