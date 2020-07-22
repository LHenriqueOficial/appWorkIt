import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Model/usuario';
import { Mensagens } from './../../Model/mensagens';
import { AngularFirestore } from 'angularfire2/firestore';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {
 
  private usuarioSubscription: Subscription;
  public usuario: Usuario ={}
  idUsuarioMensagem: any;
  mensagem: Mensagens ={};
  usuarioDe:string;
  usuarioPara:string;
  listamensagens: Observable<Mensagens[]>
  lista: Observable<Mensagens[]>


  constructor(
    private fbAuth:AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
   public db: AngularFirestore,
  

  ) { 

    // this.mensagem = new Mensagens()
    this.usuarioPara= this.activatedRoute.snapshot.params['id'];
    console.log("teste id parametro "+ this.usuarioPara)
    if (this.usuarioPara) this.loadUser();
  }

  ngOnInit() {
this.verificaLogin();
this.listarMensagens();
  }

  ngOnDestroy() {
  }

  verificaLogin(){
    this.fbAuth.authState.subscribe(user=>{
      if(user){
        this.usuarioDe = user.uid
      }
    })
  }
  listarMensagens(){
    this.lista = this.db.collection<Mensagens>("Mensagens" , ref =>{
      return ref.limit(100).orderBy("data")
    }).valueChanges()/// faz a consulta ser dinamica toda vez que alterar a base de dados altera a view
    this.lista.subscribe(res =>
      {
      this.filtraLista(res)
      })
  }

  filtraLista(res){

    this.listamensagens =res.filter(t=>(t.de == this.usuarioDe && t.para == this.usuarioPara)|| t.para == this.usuarioDe && t.de == this.usuarioPara ) 

    console.log(this.listamensagens);
  }

  loadUser() {
    // this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
    //   this.usuario = data;
    //   console.log(this.usuario);
    // });
  }

PostarMensagem(){

    this.mensagem.de = this.usuarioDe
    this.mensagem.para = this.usuarioPara
    this.mensagem.data = new Date().getTime();

    let mensagens =  this.db.collection("Mensagens")
    mensagens.add({
      de: this.mensagem.de,
      para:this.mensagem.para,
      texto: this.mensagem.texto,
      data: this.mensagem.data,

    })

  }

}
