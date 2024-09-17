import { Empresa } from "./empresa";

export class Titulo {

    public id: number;
    public nombre: string;
    public ano: number;
    public director: string;
    public empresa: Empresa | null;
    public precio: number;
    public categoria: string;

    constructor(id: number,
        nombre: string,
        ano: number,
        director: string,
        empresa: Empresa | null,
        precio: number,
        categoria: string) {
        this.id = id;
        this.nombre = nombre;
        this.ano = ano;
        this.director = director;
        this.empresa = empresa;
        this.precio = precio;
        this.categoria = categoria;
    }

}