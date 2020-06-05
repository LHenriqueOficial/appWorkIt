import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DadosFinanceirosPage } from './dados-financeiros.page';

describe('DadosFinanceirosPage', () => {
  let component: DadosFinanceirosPage;
  let fixture: ComponentFixture<DadosFinanceirosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosFinanceirosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DadosFinanceirosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
