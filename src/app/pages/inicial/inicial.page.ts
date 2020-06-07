import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage implements OnInit {

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
