import { Component} from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { Usuario } from 'src/app/Model/usuario';
import { AngularFirestore } from 'angularfire2/firestore';
import { Publicacao } from './../../Model/publicacao';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { Subscription } from 'rxjs';
import { Formacao } from './../../Model/formacao';
import { Profissao } from './../../Model/profissao';
import { UsuarioService } from './../../services/usuario.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  tipoPublicacao:string;
  nomeUser: string;
  sobreNome: string;
  profissao: string;
  idColecao: string;
  usuario:any=[];
  user:any
  formacao: Formacao={};
  prof: Profissao={};
  areaAtuacao: any;
  experiencia: any;
  userId: string;
  public publicacao: Publicacao={};
  colecao= new Array<Publicacao>();
  private publicacaoSubscription: Subscription;
  private usuarioSubscription: Subscription;
  
  // public ordem = new Array<Ordem>();
  dadosAtualizacao: string;
  id: any;
  valorHora: any;
  statusProfissao: string;
  statusPessoal: string;


  constructor(
    private  modalCtrl: ModalController,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private servicePublicacao: PublicacaoService,
    private serviceUsuario: UsuarioService,
    public navParams: NavParams,
    public alertCtrl: AlertController,
  ) {
    this.dadosAtualizacao= navParams.get('id')
    this.fbAuth.authState.subscribe(user=>{
      if (user)
      {
       this.userId = user.uid;

      }
      this.carregaUser();
      this.carregaPublicacao();
    })
   }

  ngOnInit() {
  

  }
fecharModal(){
  this.modalCtrl.dismiss();
}



carregaUser(){

  let users=this.db.collection<Usuario>("Usuarios")
  users.ref.where("userId", "==", this.userId).get().then(result=>{
         result.forEach(doc =>{
           this.usuario.push(doc.data())
           console.log(doc.id, ' => ' , doc.data())
           this.nomeUser = doc.data().nome,
            console.log(this.nomeUser)
           this.sobreNome = doc.data().sobrenome,
           this.profissao = doc.data().profissao?.descricao,
           this.areaAtuacao = doc.data().profissao?.areaAtuacao,
           this.experiencia = doc.data().profissao?.tempoExperiencia
           this.idColecao = doc.id
           console.log("id dacoleção do usuario " + this.idColecao)
           this.usuarioSubscription = this.serviceUsuario.getUsuario(this.idColecao).subscribe(data=>{
             this.user=data;
             console.log(this.user);
           })
         }) 
        
         console.log("id dacoleção do usuario " + this.idColecao)
    })
  
}

carregaPublicacao(){
      let users=this.db.collection<Publicacao>("Publicacao")
      users.ref.where("userId", "==", this.userId).get().then(result=>{
             result.forEach(doc =>{
               this.colecao.push(doc.data())
               console.log(doc.id, ' => ' , doc.data())
               console.log(this.colecao)
               this.tipoPublicacao = doc.data().tipoPublicacao,
               this.valorHora = doc.data().valorHora,
               console.log(this.valorHora)
               console.log(this.tipoPublicacao)
               this.idColecao = doc.id
               console.log("id dacoleção do usuario " + this.idColecao)
             })
            
             this.publicacaoSubscription= this.servicePublicacao.getPublicacao(this.idColecao).subscribe(data =>{
              this.publicacao = data
              console.log(this.publicacao)
            })
                
        })
 
}


async salvaPublicacao(){

  let users=this.db.collection<Publicacao>("Publicacao")
  users.ref.where("idUser", "==", this.userId).get().then(async result=>{
         result.forEach(doc =>{
           this.colecao.push(doc.data())
           console.log(doc.id, ' => ' , doc.data())
           this.idColecao = doc.id,
           this.id = doc.data().userId
           console.log(this.idColecao);
         })

         if(this.colecao.length > 0){
console.log("updade alteracao de valor" + this.publicacao.valorHora)

          this.servicePublicacao.updatePublicacao(this.idColecao, this.publicacao)
          this.modalCtrl.dismiss();
        }else {
          console.log("nova publicacao")
          this.publicacao.userId = this.userId;
          this.publicacao.dataPublicacao = new Date().getTime();
          await this.servicePublicacao.addPublicacao(this.publicacao);
          this.modalCtrl.dismiss();
        }

    }) 
}
// async showConfirm() {  
//   const confirm = await this.alertCtrl.create({  
//     header: 'Confirm!',  
//     message: 'Do you agree to use this Alert option',  
//     buttons: [  
//       {  
//         text: 'Cancel',  
//         role: 'cancel',  
//         handler: () => {  
//           console.log('Confirm Cancel');  
//         }  
//       },  
//       {  
//         text: 'Okay',  
//         handler: () => {  
//           console.log('Confirm Okay.');  
//         }  
//       }  
//     ]  
//   });  
//   await confirm.present();  
// }  
}  


