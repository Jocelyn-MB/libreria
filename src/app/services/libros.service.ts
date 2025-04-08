import { Injectable, inject } from '@angular/core';
import { Libros } from '../models/libros.model';
import { addDoc, collection, collectionData, deleteDoc, Firestore, updateDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private db: Firestore = inject(Firestore);

  constructor() { }

  //metodo para obtener los documentos de la coleccion
  getLibros(){
    const librosCollection = collection(this.db, 'libros');
    return collectionData(librosCollection, { idField: 'id' })
    .pipe(first(),);
  }
 //metodo para agregar un nuevo doucmento a la coleccion
  agregarLibro(libro: Libros) {
    const librosCollection = collection(this.db, 'libros');
    const libroData = {
      titulo: libro.titulo,
      autorId: libro.autorId ,
      year: libro.year ,
      genero: libro.genero ,
      origen: libro.origen ,
      critica: libro.critica 
    };
    addDoc(librosCollection, libroData);
  }

  modificarLibro(libro: Libros) {
    const documentRef = doc(this.db, 'libros', libro.id);
    updateDoc(documentRef,{
      titulo: libro.titulo ,
      autorId: libro.autorId ,
      year: libro.year ,
      genero: libro.genero ,
      origen: libro.origen ,
      critica: libro.critica 
    });
  }

  //metodo para eliminar un libro
  eliminarLibro(libro: Libros) {
    const documentRef = doc(this.db, 'libros', libro.id);
    deleteDoc(documentRef);
  }
}