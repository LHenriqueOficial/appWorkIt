import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicial',
    loadChildren: () => import('./pages/inicial/inicial.module').then( m => m.InicialPageModule)
  },
  {
    path: 'edit-perfil',
    loadChildren: () => import('./pages/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'perfil-pessoal',
    loadChildren: () => import('./pages/perfil-pessoal/perfil-pessoal.module').then( m => m.PerfilPessoalPageModule)
  },
  {
    path: 'perfil-profissional',
    loadChildren: () => import('./pages/perfil-profissional/perfil-profissional.module').then( m => m.PerfilProfissionalPageModule)
  },
  {
    path: 'dados-financeiros',
    loadChildren: () => import('./pages/dados-financeiros/dados-financeiros.module').then( m => m.DadosFinanceirosPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
