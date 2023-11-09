import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Titulo } from 'src/app/entidades/titulo';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { TituloService } from 'src/app/servicios/titulo.service';
import { TituloEditarComponent } from '../titulo-editar/titulo-editar.component';
import { Empresa } from 'src/app/entidades/empresa';
import { Pais } from 'src/app/entidades/pais';
import { DecidirComponent } from '../decidir/decidir.component';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {


  public textoBusqueda: string = "";
  public titulos: Titulo[] = [];
  public empresas: Empresa[] = [];

  public columnas = [
    { name: 'Nombre', prop: 'nombre' },
    { name: 'Año Pub.', prop: 'año' },
    { name: 'Protagonistas', prop: 'protagonistas' },
    { name: 'Productor', prop: 'productor' },
    { name: 'Director', prop: 'director' },
    { name: 'Empresa', prop: 'empresa.nombre' },
    { name: 'Precio', prop: 'precio' },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public tituloSeleccionada: Titulo | undefined;


  constructor(private tituloService: TituloService,
    private empresaService: EmpresaService,
    public dialogService: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.listar();
    this.listarEmpresas();
  }

  public listar() {
    this.tituloService.listar().subscribe(
      respuesta => {
        this.titulos = respuesta;
      }
    );
  }

  public listarEmpresas() {
    this.empresaService.listar().subscribe(
      respuesta => {
        this.empresas = respuesta;
      }
    );
  }

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.tituloService.buscar(this.textoBusqueda).subscribe(
        respuesta => {
          this.titulos = respuesta;
        }
      );
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const dialogRef = this.dialogService.open(TituloEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Titulo:",
        titulo: new Titulo(0, "", 0, "", "", "", new Empresa(0, "", new Pais(0, "", "", "")), 0),
        empresas: this.empresas
      }
    });

    dialogRef.afterClosed().subscribe(
      datos => {
        if (datos) {
          this.tituloService.agregar(datos.titulo).subscribe(
            respuesta => {
              this.listar();
              window.alert("Los datos del Título de Videojuego fueron agregados");
            }
          );
        }
      }, error => {
        window.alert(error.message)
      }
    );
  }

  public modificar() {
    if (this.tituloSeleccionada != null) {
      const dialogRef = this.dialogService.open(TituloEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando a datos del Titulo de Videojuego [${this.tituloSeleccionada.nombre}]`,
          titulo: this.tituloSeleccionada,
          empresas: this.empresas
        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.tituloService.modificar(datos.titulo).subscribe(
              respuesta => {
                this.listar();
                window.alert("Los datos del Titulo de Videojuego fueron modificados");
              }
            );
          }
        }, error => {
          window.alert(error.message)
        }
      );
    }
    else {
      window.alert("Debe seleccionar un Titulo de Videojuego");
    }
  }

  public verificarEliminar() {
    if (this.tituloSeleccionada != null) {
      const dialogRef = this.dialogService.open(DecidirComponent, {
        width: '400px',
        height: '200px',
        data: {
          titulo: `Eliminando registro del Titulo de Videojuego [${this.tituloSeleccionada.nombre}]`,
          mensaje: "Está seguro?",
          id: this.tituloSeleccionada.id,
        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.tituloService.eliminar(datos.id).subscribe(
              respuesta => {
                if (respuesta == true) {
                  this.listar();
                  window.alert("Los datos del Titulo de Videojuego fueron eliminados");
                }
                else {
                  window.alert("No se pudo eliminar el registro del titulo de Videojuego");
                }
              }
            );
          }
        }, error => {
          window.alert(error.message)
        }
      );

    }
    else {
      window.alert("Debe seleccionar un Titulo de Videojuego");
    }
  }


  public onActivate(event: any) {
    if (event.type == 'click') {
      this.tituloSeleccionada = event.row;
    }
  }


}
