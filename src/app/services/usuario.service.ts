import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../Model/usuario';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
private usuarioCollection:  AngularFirestoreCollection<Usuario>;

  constructor(
    private db: AngularFirestore,
  )
   {
     this.usuarioCollection = this.db.collection<Usuario>('Usuarios');
   }

   getUsuarios(){
     return this.usuarioCollection.snapshotChanges().pipe(
       map(res =>{
         return res.map(a=>{
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return{id, ... data};
         })
       })
     )
   }


   getUsuario(id: string){
     return this.usuarioCollection.doc<Usuario>(id).valueChanges();
   }

   addUsuario(usuario: Usuario){
     return this.usuarioCollection.add(usuario);
   }

   updateUsuario(id: string, user: Usuario) {
    return this.usuarioCollection.doc<Usuario>(id).update(user);
  }

  deleteUsuario(id: string) {
    return this. usuarioCollection.doc(id).delete();
  }

}
