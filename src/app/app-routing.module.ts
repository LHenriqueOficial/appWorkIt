import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
import { LoggerGuard } from './services/guards/logger.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
    path: 'login',canActivate:[LoggerGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicial',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/inicial/inicial.module').then( m => m.InicialPageModule)
  },
  {
    path: 'edit-perfil/:id',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'edit-perfil',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/edit-perfil/edit-perfil.module').then( m => m.EditPerfilPageModule)
  },
  {
    path: 'perfil-pessoal/:id',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/perfil-pessoal/perfil-pessoal.module').then( m => m.PerfilPessoalPageModule)
  },
  {
    path: 'perfil-pessoal',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/perfil-pessoal/perfil-pessoal.module').then( m => m.PerfilPessoalPageModule)
  },
  {
    path: 'perfil-profissional/:id',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/perfil-profissional/perfil-profissional.module').then( m => m.PerfilProfissionalPageModule)
  },
  {
    path: 'perfil-profissional',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/perfil-profissional/perfil-profissional.module').then( m => m.PerfilProfissionalPageModule)
  },
  {
    path: 'dados-financeiros/:id',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/dados-financeiros/dados-financeiros.module').then( m => m.DadosFinanceirosPageModule)
  },
  {
    path: 'dados-financeiros',canActivate:[AuthGuard],
    loadChildren: () => import('./pages/dados-financeiros/dados-financeiros.module').then( m => m.DadosFinanceirosPageModule)
  },
  {
    path: 'teste/:id',
    loadChildren: () => import('./pages/teste/teste.module').then( m => m.TestePageModule)
  },
  {
    path: 'teste',
    loadChildren: () => import('./pages/teste/teste.module').then( m => m.TestePageModule)
  },
 
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
