import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentificacaoService } from '../autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerGuard implements CanActivate {

  constructor(
    private authService: AutentificacaoService,
    private router: Router
  ) { }
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        if (user) this.router.navigate(['inicial']);

        resolve(!user ? true : false);
      });
    });
  }

  
}
