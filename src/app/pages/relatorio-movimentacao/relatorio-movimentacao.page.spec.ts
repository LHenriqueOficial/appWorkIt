import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelatorioMovimentacaoPage } from './relatorio-movimentacao.page';

describe('RelatorioMovimentacaoPage', () => {
  let component: RelatorioMovimentacaoPage;
  let fixture: ComponentFixture<RelatorioMovimentacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioMovimentacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioMovimentacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
