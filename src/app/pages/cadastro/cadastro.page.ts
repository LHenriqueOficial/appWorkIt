import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Model/usuario';
import { AlertController, NavController } from '@ionic/angular';
import {AngularFireAuth} from 'angularfire2/auth'
import {AngularFirestore} from 'angularfire2/firestore'
import { async } from '@angular/core/testing';
import { ContaUser } from './../../Model/conta-user';
import { ContaUserService } from './../../services/conta-user.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public usuario: Usuario={};
  public contaUser: ContaUser={};
  loading: any;
  nome:string;
  idUser: string;
  
  constructor( 
    public fbAuth: AngularFireAuth ,
    public db:AngularFirestore, 
    public AlertCtrl :AlertController, 
    public navCtrl : NavController,
    private router: Router,
    private contaUserService: ContaUserService,
    ) 
  
    {
    // this.usuario=new Usuario()
   }

  ngOnInit() {

  }

  cadastrarUsuario(){
    // metodo para criar usuario e enviar para fire base 
      this.fbAuth.auth.createUserWithEmailAndPassword( this.usuario.email, this.usuario.senha).then
    (result=>{
      // let users= this.db.collection("Usuarios") // esta recebendo a base de dados Usuarios do fireStore
      // users.add({
      //   nome:this.usuario.nome,
      //   email:this.usuario.email,
      //   senha:this.usuario.senha,
      //   userId:result.user.uid,
      }).then( async ()=>{
        this.fbAuth.authState.subscribe( user=>{
          this.idUser = user.uid;
        console.log("teste id para conta user "+ this.idUser)
        // let conta = this.db.collection("ContaUser")
        // conta.add({
        //   nome: this.usuario.nome,
        //   email:this.usuario.email,
        //   idConta:this.idUser,
        //   saldo:this.contaUser.saldo
          
        // })
        
        })
         const alert = await this.AlertCtrl.create({
           header:'Mensagen ',
           subHeader:'',
           message:'Usuário Cadastrado com Sucesso ',
           buttons: ['Ok']
         });
         await alert.present();
         
  /// autenticando o usuario apos autenticação 
  this.fbAuth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(()=>{
  this.fbAuth.authState.subscribe(async user=>{

     let users= this.db.collection("Usuarios") // esta recebendo a base de dados Usuarios do fireStore
 // esta recebendo a base de dados Usuarios do fireStore
      users.add({
        nome:this.usuario.nome,
        email:this.usuario.email,
        senha:this.usuario.senha,
        userId:user.uid,
        statusPerfilProfissional: 'nao completo',
        statusPerfilPessoal: 'nao completo',
      });
      this.contaUser.nome = this.usuario.nome;
      this.contaUser.email = user.email;
      this.contaUser.idConta = this.idUser;
      this.contaUser.saldo = 0;
  async ; await this.contaUserService.addConta(this.contaUser)
    if(user){
      this.idUser = user.uid;
      const alert = await this.AlertCtrl.create({
        header:'mensagem',
        subHeader:'',
        message:'Usuario autenticado',
        buttons:['Ok']
      });
      await alert.present();
    }
  })
    this.router.navigateByUrl('inicial');
  });
  
      }).catch( async ()=>{
        const alert = await this.AlertCtrl.create({
          header:'Menssagem',
          subHeader:'',
          message:'Erro ao Cadastrar Usuário',
          buttons: ['Ok']
        });
  
        await alert.present();
          
        
      })
  
  }


 
}
