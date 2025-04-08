import { Timestamp } from "firebase/firestore";

export class Autores {
    id!: string;
    nombre!: string;
    origen!:string;
    libescritos!: number;
    nacimiento!: Timestamp;
    muerte!: Timestamp;
}