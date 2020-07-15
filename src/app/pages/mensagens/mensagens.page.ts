import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Model/usuario';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {
 
  private usuarioSubscription: Subscription;
  public usuario: Usuario ={}
  idUsuarioMensagem: any;
  textoMensagem: string;

  constructor(
    private fbAuth:AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,

  ) { 

    this.idUsuarioMensagem= this.activatedRoute.snapshot.params['id'];
    console.log("teste id parametro "+ this.idUsuarioMensagem)
    if (this.idUsuarioMensagem) this.loadUser();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  verificaLogin(){
    this.fbAuth.authState.subscribe(user=>{
      if(user){

      }
    })
  }

  loadUser() {
    // this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
    //   this.usuario = data;
    //   console.log(this.usuario);
    // });
  }

  PostarMensagem(texto: string){

    console.log(texto);

  }

}
