import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TiendaVideo';

  public opciones = [
    { titulo: "Países", url: "pais", icono: "assets/iconos/Pais.png" },
    { titulo: "Empresas", url: "empresa", icono: "assets/iconos/Empresa.png" },
    { titulo: "Títulos", url: "titulo", icono: "assets/iconos/Titulo.png" },
  ];

  constructor(public dialog: MatDialog,
    private router: Router
  ) {
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "300px",
      height: "300px",
      data: { usuario: "", clave: "" }
    });

    dialogRef.afterClosed().subscribe(data => {
      
    }
    );
  }
}
