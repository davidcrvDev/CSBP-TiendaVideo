import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../entidades/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}paises`;
  }

  public listar(): Observable<Pais[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Pais[]>(urlT);
  }

}