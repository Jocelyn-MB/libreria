import { Timestamp } from "firebase/firestore";

export class Libros {
    id!: string;
    titulo!: string;
    autorId!:string;
    year!:number;
    genero!:string;
    origen!: string;
    critica!: string;
}