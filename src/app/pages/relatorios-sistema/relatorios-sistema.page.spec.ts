import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelatoriosSistemaPage } from './relatorios-sistema.page';

describe('RelatoriosSistemaPage', () => {
  let component: RelatoriosSistemaPage;
  let fixture: ComponentFixture<RelatoriosSistemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoriosSistemaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatoriosSistemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
