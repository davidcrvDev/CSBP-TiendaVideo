import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Titulo } from '../entidades/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}titulos`;

  }

  public listar(): Observable<Titulo[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Titulo[]>(urlT);
  }


  public buscar(texto: string): Observable<Titulo[]> {
    let urlT = `${this.url}/buscar/${texto}`;
    return this.http.get<Titulo[]>(urlT);
  }

  public agregar(titulo: Titulo): Observable<Titulo> {
    let urlT = `${this.url}/agregar`;
    return this.http.post<Titulo>(urlT, titulo);
  }

  public modificar(titulo: Titulo): Observable<Titulo> {
    let urlT = `${this.url}/modificar`;
    return this.http.put<Titulo>(urlT, titulo);
  }

  public eliminar(id: number): Observable<boolean> {
    let urlT = `${this.url}/eliminar/${id}`;
    return this.http.delete<boolean>(urlT);
  }

}
