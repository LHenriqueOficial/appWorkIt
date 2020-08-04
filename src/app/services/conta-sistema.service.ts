import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ContaSistema } from './../Model/conta-sistema';

@Injectable({
  providedIn: 'root'
})
export class ContaSistemaService {
  private contaCollection:  AngularFirestoreCollection<ContaSistema>;
  constructor(
    private db: AngularFirestore,
  ) { 
    this.contaCollection = this.db.collection<ContaSistema>('ContaSistema');
  }


  getContaSistema(id: string){
    return this.contaCollection.doc<ContaSistema>(id).valueChanges();
  }

  updateContaSistema(id: string, conta: ContaSistema) {
   return this.contaCollection.doc<ContaSistema>(id).update(conta);
 }


}
