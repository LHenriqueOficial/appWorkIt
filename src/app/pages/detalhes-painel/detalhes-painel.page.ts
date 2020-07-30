import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { PainelUsuarioService } from 'src/app/services/painel-usuario.service';
import { Movimentacao } from 'src/app/Model/movimentacao';
import { Publicacao } from 'src/app/Model/publicacao';
import { PainelUsuario } from 'src/app/Model/painel-usuario';
import { Subscription } from 'rxjs';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';

@Component({
  selector: 'app-detalhes-painel',
  templateUrl: './detalhes-painel.page.html',
  styleUrls: ['./detalhes-painel.page.scss'],
})
export class DetalhesPainelPage implements OnInit {
  idPublicacao: string;
  idUser: any;
  public movi = new Array<Movimentacao>();
  public:Publicacao ={};
  userPainel: PainelUsuario={};
  movimentacao: Movimentacao={};
  idMovimentacao: string;
  hora: any;

  private publicacaoSubscription: Subscription;
  private painelUserSubscription: Subscription;
  private movimentacaoSubscription: Subscription
  usuario: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private servicePublicacao: PublicacaoService,
    private servicePainelUser: PainelUsuarioService,
    private movimentacaoService: MovimentacaoService,
    // public navParams: NavParams,
    private router:  Router,
  ) { 

    this.idUser = this.activatedRoute.snapshot.params['id'];
    console.log(this.idUser);
    this.painelUserSubscription= this.servicePainelUser.getPainelUser(this.idUser).subscribe(data =>{
      this.userPainel = data;
      console.log(this.userPainel)

      this.loadMovimentacao();
    })
  }

  ngOnInit() {}

  loadMovimentacao(){

    this.userPainel.idUsuariologado    
    let lista=this.db.collection<Movimentacao>("Movimentacao")
    lista.ref.where("idContratante", "==" , this.userPainel.idUsuariologado ).get().then(res =>{
     res.forEach(doc => {
       this.movi.push(doc.data())
       console.log(doc.id, ' => ' , doc.data())
       this.idMovimentacao= doc.id  
     });
     this.movimentacaoSubscription = this.movimentacaoService.getMovimentacao(this.idMovimentacao).subscribe(data =>{
       this.movimentacao = data;
      
     })
   })   
  }


  rota(id:string){
    // this.fecharModal();
    this.router.navigate(['/mensagens', id])
  }



}
