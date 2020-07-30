import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Movimentacao } from './../Model/movimentacao';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  private movimentacaoCollection:  AngularFirestoreCollection<Movimentacao>;


  constructor(  private db: AngularFirestore,
    ) { 
    this.movimentacaoCollection = this.db.collection<Movimentacao>('Movimentacao');
  }

  getMovimentacoes(){
    return this.movimentacaoCollection.snapshotChanges().pipe(
      map(res =>{
        return res.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ... data};
        })
      })
    )
  }
  

  
getMovimentacao(id: string){
  return this.movimentacaoCollection.doc<Movimentacao>(id).valueChanges();
}

addMovimentacao(movimentacao: Movimentacao){
  return this.movimentacaoCollection.add(movimentacao);
}

updateMovimentacao(id: string,movimentacao: Movimentacao) {
 return this.movimentacaoCollection.doc<Movimentacao>(id).update(movimentacao);
}

deleteMovimentacao(id: string) {
return this.movimentacaoCollection.doc(id).delete();
}

}


