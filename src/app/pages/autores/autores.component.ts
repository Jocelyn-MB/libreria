import { Component } from '@angular/core';
import { Autores } from '../../models/autores.model';
import { AutoresService } from '../../services/autores.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-autores',
  imports: [FormsModule, CommonModule],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent {
  
  autores: any[] = [];
  autor = new Autores();
 
  
  constructor(private autorService: AutoresService) {
    this.getAutores();
  }
  
  async getAutores(): Promise<void> {
    this.autores = await firstValueFrom(this.autorService.getAutores());
  }
  
  // Método para insertar un autor desde el form
  insertarAutor() {
 
    this.autorService.agregarAutores(this.autor);
    this.autor = new Autores();
    this.getAutores();
  }
  
  // Método para seleccionar el autor
  selectAutor(autorSeleccionado: Autores) {
    this.autor = autorSeleccionado;
  
  }
  
  // Método para modificar un autor desde el form
  updateAutor() {
    this.autorService.modificarAutor(this.autor);
    this.autor = new Autores();
    this.getAutores();
  }
  
  // Método para eliminar autores
  deleteAutor() {
    this.autorService.eliminarAutor(this.autor);
    this.autor = new Autores();
    this.getAutores();
  }
}