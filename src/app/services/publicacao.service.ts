import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Publicacao } from './../Model/publicacao';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {
  private publicacaoCollection:  AngularFirestoreCollection<Publicacao>;


  constructor(
    private db: AngularFirestore,
  ) {
    this.publicacaoCollection = this.db.collection<Publicacao>('Publicacao');

   }

   getPublicacoes(){
    return this.publicacaoCollection.snapshotChanges().pipe(
      map(res =>{
        return res.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ... data};
        })
      })
    )
  }


  getPublicacao(id: string){
    return this.publicacaoCollection.doc<Publicacao>(id).valueChanges();
  }

  addPublicacao(publicacao: Publicacao){
    return this.publicacaoCollection.add(publicacao);
  }

  updatePublicacao(id: string, publicacao: Publicacao) {
   return this.publicacaoCollection.doc<Publicacao>(id).update(publicacao);
 }

 deletePublicacao(id: string) {
  return this. publicacaoCollection.doc(id).delete();
}

}
