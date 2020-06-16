import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Model/usuario';
import { AlertController, NavController } from '@ionic/angular';
import {AngularFireAuth} from 'angularfire2/auth'
import {AngularFirestore} from 'angularfire2/firestore'
import { async } from '@angular/core/testing';
import { ContaUser } from './../../Model/conta-user';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: Usuario={};
  public contaUser: ContaUser;
  loading: any;
  nome:string;
  
  constructor( 
    public fbAuth: AngularFireAuth ,
    public db:AngularFirestore, 
    public AlertCtrl :AlertController, 
    public navCtrl : NavController,
    private router: Router,
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
      let users= this.db.collection("Usuarios") // esta recebendo a base de dados Usuarios do fireStore
      console.log("teste cadastro 1");
      users.add({
        nome:this.usuario.nome,
        email:this.usuario.email,
        senha:this.usuario.senha,
        userId:result.user.uid,
      }).then( async ()=>{
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
    
    if(user){
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
  
    })
  }

 
}
