import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PainelUsuario } from 'src/app/Model/painel-usuario';
import { PainelUsuarioService } from './../../services/painel-usuario.service';
import { DetalhesPublicacaoComponent } from 'src/app/components/detalhes-publicacao/detalhes-publicacao.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-painel-usuario',
  templateUrl: './painel-usuario.page.html',
  styleUrls: ['./painel-usuario.page.scss'],
})
export class PainelUsuarioPage implements OnInit {
  private painelSubscription: Subscription;
  public userPainel = new Array<PainelUsuario>();

  constructor(
    private painelUserService: PainelUsuarioService,
    private db: AngularFirestore,
    private  modalCtrl: ModalController,
    public fbAuth: AngularFireAuth,

  ) { 
    this.painelSubscription = painelUserService.getPainelUsers().subscribe(data =>{
      this.userPainel= data;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.painelSubscription.unsubscribe();
  }

  
  async showDetalhesPublicacao(id: string){
    const detalhe = await this.modalCtrl.create({
      component:DetalhesPublicacaoComponent,
      cssClass: 'custom-modal',
      //passando parametro no component modal
      componentProps:{
        id:id
      }
    
    })
    detalhe.present();
    

  }


}
