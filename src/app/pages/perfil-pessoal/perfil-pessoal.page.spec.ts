import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilPessoalPage } from './perfil-pessoal.page';

describe('PerfilPessoalPage', () => {
  let component: PerfilPessoalPage;
  let fixture: ComponentFixture<PerfilPessoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPessoalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPessoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
