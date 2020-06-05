import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilProfissionalPage } from './perfil-profissional.page';

describe('PerfilProfissionalPage', () => {
  let component: PerfilProfissionalPage;
  let fixture: ComponentFixture<PerfilProfissionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilProfissionalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilProfissionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
