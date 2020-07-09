import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ContaUser } from './../Model/conta-user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContaUserService {
  private contaCollection:  AngularFirestoreCollection<ContaUser>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.contaCollection = this.db.collection<ContaUser>('ContaUser');

   }

   getContas(){
    return this.contaCollection.snapshotChanges().pipe(
      map(res =>{
        return res.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ... data};
        })
      })
    )
  }


  getConta(id: string){
    return this.contaCollection.doc<ContaUser>(id).valueChanges();
  }

  addConta(conta: ContaUser){
    return this.contaCollection.add(conta);
  }

  updateConta(id: string, conta: ContaUser) {
   return this.contaCollection.doc<ContaUser>(id).update(conta);
 }

 deleteConta(id: string) {
  return this. contaCollection.doc(id).delete();
}


}
