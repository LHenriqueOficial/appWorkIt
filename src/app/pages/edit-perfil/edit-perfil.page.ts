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
  idColecao: string;
 public usuario: Usuario ={}

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
  
  }

  loadUser() {
    this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data;
      console.log(this.usuario);
    });
  }

  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
  }

  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }

  rota(nomeDaPagina:string){
    this.router.navigate([nomeDaPagina, this.id])
  
  }
  

}
