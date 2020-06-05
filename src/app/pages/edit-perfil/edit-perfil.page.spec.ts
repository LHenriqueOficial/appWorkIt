import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPerfilPage } from './edit-perfil.page';

describe('EditPerfilPage', () => {
  let component: EditPerfilPage;
  let fixture: ComponentFixture<EditPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
