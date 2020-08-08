import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { Publicacao } from './../../Model/publicacao';
import { Subscription, Observable } from 'rxjs';
import { AreaAtuacao } from './../../Model/area-atuacao';
import { Router } from '@angular/router';
import { PainelUsuario } from './../../Model/painel-usuario';
import { PainelUsuarioService } from './../../services/painel-usuario.service';

@Component({
  selector: 'app-detalhes-publicacao',
  templateUrl: './detalhes-publicacao.component.html',
  styleUrls: ['./detalhes-publicacao.component.scss'],
})
export class DetalhesPublicacaoComponent implements OnInit {
  idPublicacao: string;
  idUser: any;
  public publicacao = new Array<Publicacao>();
  public:Publicacao ={};
  userPainel: PainelUsuario={};

  private publicacaoSubscription: Subscription;
  usuario: any;
  userId: string;
  valor: boolean = true;
  pagina: any;
  listaPainel: Observable<PainelUsuario[]>
  lista: Observable<PainelUsuario[]>
  valor2: boolean = true;
  contagem: number =0;
 

  constructor(

    public AlertCtrl :AlertController,
    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private servicePublicacao: PublicacaoService,
    private servicePainelUser: PainelUsuarioService,
    public navParams: NavParams,
    private router:  Router,
  ) {
    this.fbAuth.authState.subscribe(user=>{
      if (user)
      {
       this.userId = user.uid;
      }
    })

    
    this.idUser= navParams.get('id')
    console.log(this.idUser);
    this.pagina= navParams.get('pagina')
    console.log(this.pagina)
    
   }

  ngOnInit() {
    this.loadPublicacao(this.idUser)
  }

  fecharModal(){
    this.modalCtrl.dismiss();
  }

  loadPublicacao( id:string){
    let lista=this.db.collection<Publicacao>("Publicacao")
    lista.ref.where("userId", "==" , id ).get().then(res =>{
     res.forEach(doc => {
       this.publicacao.push(doc.data())
       console.log(doc.id, ' => ' , doc.data())
       this.public.nomeUser= doc.data().nomeUser,
       this.public.areaAtuacao= doc.data().areaAtuacao,
       this.public.profissao= doc.data().profissao,
       this.public.tempoExperiencia= doc.data().tempoExperiencia,
       this.public.descricao= doc.data().descricao,
       this.public.tipoPublicacao= doc.data().tipoPublicacao,
       this.public.valorHora= doc.data().valorHora,
       this.public.dataPublicacao= doc.data().dataPublicacao,
       this.public.userId = doc.data().userId,
       this.idPublicacao = doc.id
     });

        if(this.userId == this.public.userId || this.pagina == 'pagina relatorios'){
          console.log("id igual ")
          this.valor= true;
          this.valor2 = false;
          console.log(this.valor)

        }else{
          this.valor= false
          console.log(this.valor)
        }
      
   
  
  
   })
      
  }

  addUserPainel(){
 
      let lista = this.db.collection<PainelUsuario>("PainelUsuario" , ref =>{
        return ref.limit(100).orderBy("dataPublicacao")
      }).valueChanges()/// faz a consulta ser dinamica toda vez que alterar a base de dados altera a view
      lista.subscribe(res =>
        {
        this.filtraLista(res)
        console.log(this.contagem);

        if(this.contagem > 0){
          this.alertaErroadicionarPainelUser();
        }else{
      
    this.userPainel.idUsuariologado = this.userId
    this.userPainel.nomeUser= this.public.nomeUser,
    this.userPainel.areaAtuacao = this.public.areaAtuacao,
    this.userPainel.profissao = this.public.profissao,
    this.userPainel.tempoExperiencia = this.public.tempoExperiencia,
    this.userPainel.descricao = this.public.descricao,
    this.userPainel.tipoPublicacao = this.public.tipoPublicacao,
    this.userPainel.valorHora =this.public.valorHora,
    this.userPainel.dataPublicacao = this.public.dataPublicacao,
    this.userPainel.userId = this.public.userId,
    this.userPainel.idPublicacao = this.idPublicacao;

    this.alertaPainelUserIserido();
    this.servicePainelUser.addPainelUser(this.userPainel)

   

    this.modalCtrl.dismiss();
        }
        })
   
  }

  filtraLista(res){

    this.listaPainel =res.filter(t=>(t.idUsuariologado == this.userId )&& t.userId == this.idUser) 

    console.log(this.listaPainel);
    this.listaPainel.forEach(doc=>{
      this.contagem = this.contagem + 1;
    
    })

  }

  async alertaErroadicionarPainelUser(){
    const alert = await this.AlertCtrl.create({
      header:'Alerta',
      subHeader:'',
      message:'Usuario não pode ser inserido no Painel novamente',
      buttons: ['Ok']
    });
    await alert.present();
      }

      async alertaPainelUserIserido(){
        const alert = await this.AlertCtrl.create({
          header:'Aviso ',
          subHeader:'',
          message:'Usuario Inserido no painel com sucesso',
          buttons: ['Ok']
        });
        await alert.present();
          }


  rota(id:string){
    this.fecharModal();
    this.router.navigate(['/mensagens', id])
  }

}