import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-perfil-profissional',
  templateUrl: './perfil-profissional.page.html',
  styleUrls: ['./perfil-profissional.page.scss'],
})
export class PerfilProfissionalPage implements OnInit {

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
