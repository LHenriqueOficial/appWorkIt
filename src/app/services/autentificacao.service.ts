import { Injectable } from '@angular/core';
import { Usuario } from '../Model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutentificacaoService {

  constructor(private fbAut: AngularFireAuth) { }


  login(user: Usuario) {
    return this.fbAut.auth.signInWithEmailAndPassword(user.email, user.senha);
  }

  register(user: Usuario) {
    return this.fbAut.auth.createUserWithEmailAndPassword(user.email, user.senha);
  }

  logout() {
    return this.fbAut.auth.signOut();
  }

  getAuth() {
    return this.fbAut.auth;
  }
}
