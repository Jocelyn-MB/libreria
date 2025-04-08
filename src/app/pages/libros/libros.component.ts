import { Component, OnInit } from '@angular/core';
import { Libros } from '../../models/libros.model';
import { LibrosService } from '../../services/libros.service';
import { AutoresService } from '../../services/autores.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { combineLatest, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  //propiedades
  libros: any[] = [];
  autores: any[] = [];
  libro = new Libros();
  librosFiltro: any[]=[];
  autorFId :number | null=null;
  
  constructor(private libroService: LibrosService, private autoresService: AutoresService) {
    this.cargarLibros();
  }

  async cargarLibros(){
    const [libros,autores]= await firstValueFrom(
      combineLatest([this.libroService.getLibros(),this.autoresService.getAutores()])
    );
    this.autores =autores;
    this.libros=this.mapLibrosAutores(libros,autores);
    this.filtrarLibros();
  }
  
  mapLibrosAutores(libros: any[],autores:any []){
    return libros.map((libro:any)=>{
      const autor =autores.find((a:any)=>a.id === libro.autorId);
      return {
        ...libro,
        autorNombre: autor ? autor ['nombre']:'NA'
      };
    });
  }
   
  filtrarLibros(){
    if(this.autorFId === null || this.autorFId === undefined){
      this.librosFiltro =[...this.libros];
    }else {
      this.librosFiltro = this.libros.filter(libro => libro.autorId == this.autorFId);
    }
  }

  async getLibros():Promise<void>{
    const libros = await firstValueFrom(this.libroService.getLibros());
    this.libros = this.mapLibrosAutores(libros,this.autores);
    this.filtrarLibros();
  }


  //metodo para insertar libros
  async insertarLibro() {
    await this.libroService.agregarLibro(this.libro);
    this.libro = new Libros();
    await this.getLibros();
  }
  
  selectLibro(libroSeleccionado: Libros) {
    this.libro = libroSeleccionado;
  }
  
  async updateLibro() {
    await this.libroService.modificarLibro(this.libro);
    this.libro = new Libros();
    await this.getLibros();
  }
  
  async deleteLibro() {
    
    await this.libroService.eliminarLibro(this.libro);
    this.libro = new Libros();
    await this.getLibros();
  }
}