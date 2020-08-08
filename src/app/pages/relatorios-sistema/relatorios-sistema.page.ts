import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicacaoService } from './../../services/publicacao.service';
import { UsuarioService } from './../../services/usuario.service';
import { MovimentacaoService } from './../../services/movimentacao.service';
import { Movimentacao } from 'src/app/Model/movimentacao';
import { Usuario } from 'src/app/Model/usuario';
import { Publicacao } from 'src/app/Model/publicacao';
import { element } from 'protractor';

@Component({
  selector: 'app-relatorios-sistema',
  templateUrl: './relatorios-sistema.page.html',
  styleUrls: ['./relatorios-sistema.page.scss'],
})
export class RelatoriosSistemaPage implements OnInit {
  private publicacaoSubscription: Subscription;
  private usuariosSubcription: Subscription;
  private movimentacaoSubscription: Subscription;

 public listaMovimentacao = new Array<Movimentacao>();
 public listaUsuarios = new Array<Usuario>();
 public listaPublicacao = new Array<Publicacao>();
  totalTaxas: number =0;
  taxas:number=0;
  totalPagamentos: number=0;
  pagamentos: number=0
  totalMovimentado: number=0;
  movimentacao:number=0;
  constructor(
    private publicacaoService: PublicacaoService,
    private usuarioService: UsuarioService,
    private movimentacaoService: MovimentacaoService,
  ) {

    this.movimentacaoSubscription = this.movimentacaoService.getMovimentacoes().subscribe(data=>{
      this.listaMovimentacao = data;
      console.log(this.listaMovimentacao)
      console.log(this.listaMovimentacao.length)
      
      this.listaMovimentacao.forEach(element=>{
      this.taxas = this.taxas + element.taxaServico;
      console.log(this.taxas)
      this.pagamentos = this.pagamentos + element.valorPagamento;
      console.log(this.pagamentos);
  
      })
      this.totalTaxas = Number.parseFloat(this.taxas.toFixed(2))
      console.log(this.totalTaxas);
      this.totalPagamentos = Number.parseFloat(this.pagamentos.toFixed(2));
      console.log(this.totalPagamentos);
      this.totalMovimentado = this.totalTaxas + this.totalPagamentos;
      console.log(this.totalMovimentado);
    })

    this.usuariosSubcription = this.usuarioService.getUsuarios().subscribe(data=>{
      this.listaUsuarios = data;
      console.log(this.listaUsuarios);
      console.log(this.listaUsuarios.length)

    })

    this.publicacaoSubscription = this.publicacaoService.getPublicacoes().subscribe(data=>{
      this.listaPublicacao = data;
      console.log(this.listaPublicacao);
      console.log(this.listaPublicacao.length);
    })


   }

  ngOnInit() {


  }



}
