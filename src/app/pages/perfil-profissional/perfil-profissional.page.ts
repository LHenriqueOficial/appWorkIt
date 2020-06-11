import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Model/usuario';
import { Formacao } from './../../Model/formacao';
@Component({
  selector: 'app-perfil-profissional',
  templateUrl: './perfil-profissional.page.html',
  styleUrls: ['./perfil-profissional.page.scss'],
})
export class PerfilProfissionalPage implements OnInit {

  public usuario: Usuario= {};
  idUser: string;
  id: any;
  formacao:string;
  titulo:string;
  public usuarioSubscription: Subscription
  loading: HTMLIonLoadingElement;
  public listFormacao: Array<string>=["Fundamental Incompleto", "Fundamental Completo", "Média Incompleto",
"Médio Completo", "Superior Incompleto", "Superior Completo"];
  public listTempoServico: Array<string>=["Menos de 1 ano ", "2 anos","3 anos","4 anos","5 anos","6 anos","7 anos",
  "8 anos","9 anos "," 10 anos","Mais de 10 anos"]
  public listAreaAtuacao: Array<string>=["Administração agrícola","Administração de serviços","Administração governamental",
  "Agricultura","Alimentos e bebidas","Animação","Armazenagem","Arquitetura e planejamento","Arrecadação de recursos",
  "Artes cênicas","Artes e artesanato","Atacado","Atendimento ao consumidor","Atendimento médico e hospitalar",
  "Atendimento médico psiquiátrico","Atividades parlamentares","Automação industrial","Aviação e aeroespacial",
  "Bancos","Bancos de investimento","Belas-artes","Bens de consumo","Bibliotecas","Biotecnologia",
  "Capital de risco e participações privadas","Cinema e filmes","Composição e revisão de textos","Comércio e desenvolvimento internacional",
  "Construção","Construção de ferrovia","Construção naval","Consultoria de gerenciamento","Contabilidade",
  "Cosmética","Defesa e espaço","Desenvolvimento de programas","Design","Design gráfico","Dispositivos médicos",
  "Editoração","Educação à distância","Embalagens e recipientes","Engenharia civil","Engenharia mecânica ou industrial",
  "Ensino fundamental/médio","Ensino superior","Entrega de encomendas e fretes","Entretenimento","Esportes",
  "Execução da lei","Filantropia","Fotografia","Gestão de investimentos","Gestão de organização sem fins lucrativos",
  "Gestão educacional","Hardware","Hotelaria","Imobiliário","Importação e exportação","Impressão","Imóveis comerciais",
  "Indústria automotiva","Indústria farmacêutica","Indústria química","Indústria têxtil","Instalações e serviços de recreação",
  "Instituições religiosas","Internet","Jogos de azar","Jogos de computador","Jornais","Judiciário","Laticínios",
  "Lazer, viagens e turismo","Linhas aéreas/Aviação","Logística e cadeia de suprimentos","Manufatura de eletroeletrônicos",
  "Maquinário","Marketing e publicidade","Materiais de construção","Materiais esportivos","Medicina alternativa",
  "Mercados de capital","Militar","Mineração e metais","Museus e instituições","Mídia de difusão","Mídia online",
  "Móveis","Música","Nanotecnologia","Organização cívica e social","Organização política","Organizações de pesquisa e orientação",
  "Papel e produtos florestais","Pesca","Pesquisa","Pesquisa de mercado","Petróleo e energia","Plástico","Política pública",
  "Produtos alimentícios","Produtos de luxo e joias","Produtos eletrônicos","Produção de mídia","Prática jurídica","Prática médica",
  "Recrutamento e seleção","Recursos humanos","Recursos renováveis e meio ambiente","Rede sem fio","Redes","Relações governamentais",
  "Relações internacionais","Relações públicas e comunicações","Restaurantes","Roupas e moda","Saúde, bem-estar e educação física",
  "Segurança de redes e computadores","Segurança e investigações","Segurança pública","Seguros","Serviços ambientais",
  "Serviços da informação","Serviços financeiros","Serviços individuais e familiares","Serviços jurídicos","Serviços para eventos",
  "Serviços públicos","Software","Supermercados","Suprimentos e equipamentos comerciais","Tabaco","Tecnologia da informação e serviços",
  "Terceirização e offshoring","Tradução e localização","Transporte marítimo","Transporte/Caminhões/Trens",
  "Treinamento e orientação profissional","Varejo","Veterinária","Vidro, cerâmica e concreto","Vinhos e destilados"];
  msg: any;

 
  constructor(
    private router:  Router,
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore,
    private usuarioService:  UsuarioService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private AlertCtrl: AlertController,
  ) {

    this.id = this.activatedRoute.snapshot.params['id'];
    console.log("teste id parametro "+ this.id)
    if (this.id) this.loadUser();
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }
  logOut(){
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('login')
  }

  
  loadUser() {
    this.usuarioSubscription = this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data;
      this.usuario.formacao
    });
  }


  
  async updateUser(){
        
    this.usuario.formacao.descricao = this.formacao;
    this.usuario.formacao.titulo= this.titulo;
    await this.presentLoading();
    this.usuarioService.updateUsuario(this.id, this.usuario).then(async () => {
    await this.loading.dismiss();
    const alert = await this.AlertCtrl.create({
      header: 'Aviso',
      subHeader: '',
      message: 'Usuário Aletrado com Sucesso',
      buttons: ['Ok']
    });
    await alert.present();
    await this.ngOnInit();
    
  }).catch( async ()=>{
    const alert = await this.AlertCtrl.create({
      header:'Aviso',
      subHeader:'',
      message:'Erro ao Cadastrar Usuário',
      buttons: ['Ok']
    });

    await alert.present();
      
    
  })
    

}

async presentLoading() {
  this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
  return this.loading.present();
  
}

async presentToast(message: string) {
  const toast = await this.toastCtrl.create({ message, duration: 3000 });
  toast.present();
}

}