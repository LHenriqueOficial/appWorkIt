import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Model/usuario';
import { Mensagens } from './../../Model/mensagens';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {
 
  private usuarioSubscription: Subscription;
  public userDe:Usuario={};
  public userPara :Usuario={};
  idUsuarioMensagem: any;
  mensagem: Mensagens ={};
  usuarioDe:string;
  usuarioPara:string;
  listamensagens: Observable<Mensagens[]>
  lista: Observable<Mensagens[]>
  usuario=new Array<Usuario>();
  idColecaoUsuarioDe: string;
  nomeUser: any;
  idColecaoUsuarioPara: string;
  nomede: string;


  constructor(
    private fbAuth:AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
   public db: AngularFirestore,
  

  ) { 
    this.usuarioPara= this.activatedRoute.snapshot.params['id'];
    console.log("teste id parametro "+ this.usuarioPara)

    let users=this.db.collection<Usuario>("Usuarios")
    users.ref.where("userId", "==", this.usuarioPara).get().then(result=>{
           result.forEach(doc =>{
             this.usuario.push(doc.data())
             console.log(doc.id, ' => ' , doc.data())
             this.idColecaoUsuarioPara= doc.id
             console.log("id dacoleção do usuario " + this.idColecaoUsuarioPara)
           })
               this.usuarioSubscription = this.usuarioService.getUsuario(this.idColecaoUsuarioPara).subscribe(data => {
                this.userPara = data;
               })
        })

    this.fbAuth.authState.subscribe(user=>{
      if(user){
        this.usuarioDe = user.uid
        let users=this.db.collection<Usuario>("Usuarios")
        users.ref.where("userId", "==", this.usuarioDe).get().then(result=>{
               result.forEach(doc =>{
                 this.usuario.push(doc.data())
                 console.log(doc.id, ' => ' , doc.data())
                 this.idColecaoUsuarioDe = doc.id
                 console.log("id dacoleção do usuario " + this.idColecaoUsuarioDe)
               })
                   this.usuarioSubscription = this.usuarioService.getUsuario(this.idColecaoUsuarioDe).subscribe(data => {
                    this.userDe = data;
                   
                   })
            })
      }
    })    
    
  }

  ngOnInit() {

this.listarMensagens();
  }

  ngOnDestroy() {
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

PostarMensagem(){

    this.mensagem.de = this.usuarioDe
    this.mensagem.para = this.usuarioPara
    this.mensagem.data = new Date().getTime();

    this.mensagem.nomeDe = this.userDe.nome;
    this.mensagem.nomePara =this.userPara.nome;
    this.mensagem.imagemDe = '';
    this.mensagem.ImagemPara ='';
    console.log(this.mensagem.nomeDe)
    console.log(this.mensagem.nomeDe)

    let mensagens =  this.db.collection("Mensagens")
    mensagens.add({
      de: this.mensagem.de,
      para:this.mensagem.para,
      texto: this.mensagem.texto,
      data: this.mensagem.data,
      nomeDe:this.mensagem.nomeDe,
      nomePara:this.mensagem.nomePara,
      imagemDe:this.mensagem.imagemDe,
      ImagemPara:this.mensagem.ImagemPara

    })

  }

}
