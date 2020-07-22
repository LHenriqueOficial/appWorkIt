import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { PainelUsuario } from './../Model/painel-usuario';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PainelUsuarioService {
  private panelUserCollection:  AngularFirestoreCollection<PainelUsuario>;

  constructor(
    private db: AngularFirestore,
  ) 
  {
    this.panelUserCollection = this.db.collection<PainelUsuario>('PainelUsuario');
   }



  getPainelUsers(){
    return this.panelUserCollection.snapshotChanges().pipe(
      map(res =>{
        return res.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ... data};
        })
      })
    )
  }


  getPainelUser(id: string){
    return this.panelUserCollection.doc<PainelUsuario>(id).valueChanges();
  }

  addPainelUser(userPainel: PainelUsuario){
    return this.panelUserCollection.add(userPainel);
  }

  updatePainelUser(id: string, userPainel: PainelUsuario) {
   return this.panelUserCollection.doc<PainelUsuario>(id).update(userPainel);
 }

 deletePainelUser(id: string) {
  return this. panelUserCollection.doc(id).delete();
}
}
