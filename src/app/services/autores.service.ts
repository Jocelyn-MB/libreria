import { Injectable, inject } from '@angular/core';
import { Autores } from '../models/autores.model';
import { addDoc, collection, collectionData, deleteDoc, Firestore, updateDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  private db: Firestore = inject(Firestore);

  constructor() { }

  //metodo para obtener todos los doucmentos de la coleccion
  getAutores(){
    const autoresCollection = collection(this.db, 'autor');
    return collectionData(autoresCollection, { idField: 'id' })
    .pipe(first(),);
  }


  //metodo para agregar un nuevo documento
  async agregarAutores(autor: Autores) {
    const autoresCollection = collection(this.db, 'autor');
    const autorData = {
      nombre: autor.nombre ,
      origen: autor.origen ,
      libescritos: autor.libescritos 
    };
    await addDoc(autoresCollection, autorData);
  }

  async modificarAutor(autor: Autores) {
    const documentRef = doc(this.db, 'autor', autor.id);
    const autorData = {
      nombre: autor.nombre ,
      origen: autor.origen ,
      libescritos: autor.libescritos 
    };
    await updateDoc(documentRef, autorData);
  }

  eliminarAutor(autor: Autores) {
    const documentRef = doc(this.db, 'autor', autor.id);
    deleteDoc(documentRef);
  }
}