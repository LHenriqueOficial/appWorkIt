import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagens } from 'src/app/Model/mensagens';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-menssagens-usuario',
  templateUrl: './menssagens-usuario.page.html',
  styleUrls: ['./menssagens-usuario.page.scss'],
})
export class MenssagensUsuarioPage implements OnInit {
  listamensagens: Observable<Mensagens[]>
  lista: Observable<Mensagens[]>
  userId: string;
  constructor(
    private fbAuth:AngularFireAuth,
    // private activatedRoute: ActivatedRoute,
    // private usuarioService: UsuarioService,
   public db: AngularFirestore,
  )
   {
    this.fbAuth.authState.subscribe(user=>{
      if(user){
        this.userId = user.uid
      }
    })
  }
  ngOnInit() {
    this.listarMensagens();
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

    this.listamensagens =res.filter(t=>(t.de == this.userId && t.para ==! this.userId) ||  t.para == this.userId && t.de ==! this.userId) 
    // this.listamensagens =res.filter(t=>(t.de == this.usuarioDe && t.para == this.usuarioPara)|| t.para == this.usuarioDe && t.de == this.usuarioPara ) 

    console.log(this.listamensagens);

  }



}
