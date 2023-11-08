import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../entidades/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlAPI}empresas`;

  }

  public listar(): Observable<Empresa[]> {
    let urlT = `${this.url}/listar`;
    return this.http.get<Empresa[]>(urlT);
  }

  public agregar(empresa: Empresa): Observable<Empresa> {
    let urlT = `${this.url}/agregar`;
    return this.http.post<Empresa>(urlT, empresa);
  }

  public modificar(empresa: Empresa): Observable<Empresa> {
    let urlT = `${this.url}/modificar`;
    return this.http.put<Empresa>(urlT, empresa);
  }

  public eliminar(id: number): Observable<boolean> {
    let urlT = `${this.url}/eliminar/${id}`;
    return this.http.delete<boolean>(urlT);
  }

}
