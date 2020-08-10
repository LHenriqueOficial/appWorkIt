import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from 'src/app/Model/usuario';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { PublicacaoPage } from './../../modals/publicacao/publicacao.page';
import { async } from '@angular/core/testing';
import { CardComponent } from './../../components/card/card.component';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Publicacao } from 'src/app/Model/publicacao';


@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage implements OnInit {
  nomeUser: any;
  idColecao: string;
  usuario:any=[];
  sobreNome: string;
  profissao: any;
  public publicacao = new Array<Publicacao>();
  user:Usuario={}
  valor: boolean =false;
  quantidadePublicacao: number;
  usuarioSubscription: Subscription;

  constructor(
    private router:  Router,
    public fbAuth: AngularFireAuth,
    public db : AngularFirestore,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private AlertCtrl: AlertController,
    private serviceUsuario: UsuarioService,
    
  ) {  }

  ngOnInit() {
    this.carregaUser();
    this.carregaPublicacoes();
  }
  showScreen(nomeDaPagina: string){
    this.navCtrl.navigateForward(nomeDaPagina);
  }

  rota(){
    this.router.navigate(['/edit-perfil', this.idColecao])
  }

  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }

  carregaPublicacoes() {
    let lista=this.db.collection<Publicacao>("Publicacao")
   
     lista.ref.orderBy("dataPublicacao", "desc" ).get().then(res =>{
      
      res.forEach(doc => {
        this.publicacao.push(doc.data())
        console.log(doc.id, ' => ' , doc.data())
        this.quantidadePublicacao =this.publicacao.length;
        console.log(this.quantidadePublicacao);
        // console.log("id publicação " + this.idPublicacao)  
      });
    })

  }

carregaUser(){

  this.fbAuth.authState.subscribe(user=>{
    if (user)
    {
      let uid = user.uid;
      let users=this.db.collection<Usuario>("Usuarios")
      users.ref.where("userId", "==", uid).get().then(result=>{
             result.forEach(doc =>{
               this.usuario.push(doc.data())
               console.log(doc.id, ' => ' , doc.data())
               this.nomeUser = doc.data().nome,
               this.sobreNome = doc.data().sobrenome,
               this.profissao = doc.data().profissao?.descricao,
               this.idColecao = doc.id
               console.log("id dacoleção do usuario " + this.idColecao)
             })

             this.usuarioSubscription = this.serviceUsuario.getUsuario(this.idColecao).subscribe(data=>{
              this.user=data;
              console.log(this.user);
              console.log(this.user.statusPerfilPessoal);
              console.log(this.user.statusPerfilProfissional)
              if(this.user.statusPerfilProfissional == 'nao completo' || this.user.statusPerfilPessoal == 'nao completo'){
                console.log('nao pode entrar na pagina')
                this.valor=true;
                this.alertaBloqueioAcesso()
              
              }
            })
             
          })
 
    }
    else{
      console.log("nao autenticado")
      this.logOut();
    }
  })

}

  async showModal(){
  const modal = await this.modalCtrl.create({
    component:PublicacaoPage
  })
  modal.present();
}
async showCard(){
  const card = await this.modalCtrl.create({
    component:CardComponent,
    cssClass: 'custom-modal'
  
  })
  card.present();
}
async OpenImagem(){
 
  const alert = await this.AlertCtrl.create({
    header:'Foto Perfil',
    message: '<img src="/assets/img/lauro.perfil.jpeg" />',
    buttons: ['Ok']
  });
  await alert.present();

}

async alertaBloqueioAcesso(){
  const alert = await this.AlertCtrl.create({
    header:'Alerta',
    subHeader:'Por favor complete seu perfil Pessoal e Profissional Clicando no icone no canto superior esquerdo da tela',
    message: '<img src="/assets/img/engrenagem-100.png" />',
    buttons: ['Ok'],
    
  });
  await alert.present();
    }


}
