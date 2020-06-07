import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dados-financeiros',
  templateUrl: './dados-financeiros.page.html',
  styleUrls: ['./dados-financeiros.page.scss'],
})
export class DadosFinanceirosPage implements OnInit {

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
