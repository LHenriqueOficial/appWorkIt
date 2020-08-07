import { Component, OnInit } from '@angular/core';
import { Movimentacao } from 'src/app/Model/movimentacao';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-relatorio-movimentacao',
  templateUrl: './relatorio-movimentacao.page.html',
  styleUrls: ['./relatorio-movimentacao.page.scss'],
})
export class RelatorioMovimentacaoPage implements OnInit {

  listaMovimentacao: Observable<Movimentacao[]>
  lista: Observable<Movimentacao[]>
  usuarioLogado: string;
  public movi = new Array<Movimentacao>();


  constructor(
    private fbAuth:AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
   public db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.verificaLogin();
    this.listarMensagens();
  }

  verificaLogin(){
    this.fbAuth.authState.subscribe(user=>{
      if(user){
        this.usuarioLogado = user.uid
      }
    })
  }


  listarMensagens(){
    this.lista = this.db.collection<Movimentacao>("Movimentacao" , ref =>{
      return ref.limit(100).orderBy("horaInicio")
    }).valueChanges()/// faz a consulta ser dinamica toda vez que alterar a base de dados altera a view
    this.lista.subscribe(res =>
      {
        // res.forEach(doc =>{
          // this.movi.push(doc.data())
          // console.log()
        // })
      this.filtraLista(res)
      })
  }

  filtraLista(res){

    this.listaMovimentacao =res.filter(t=>(t.idContratante == this.usuarioLogado || t.idContratado == this.usuarioLogado) ) 

    console.log(this.listaMovimentacao);
  }

}
