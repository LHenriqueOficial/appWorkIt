import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
import { Usuario } from './../../Model/usuario';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {
  id: string = null;
  public usuario: Usuario= {};
  private usuarioSubscription: Subscription;

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
  }

  loadUser() {
    this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data;
      console.log(this.usuario);
    });
  }

}
