import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Empresa } from 'src/app/entidades/empresa';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { EmpresaEditarComponent } from '../empresa-editar/empresa-editar.component';
import { Pais } from 'src/app/entidades/pais';
import { PaisService } from 'src/app/servicios/pais.service';
import { DecidirComponent } from '../decidir/decidir.component';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit {

  public textoBusqueda: string = "";
  public empresas: Empresa[] = [];
  public paises: Pais[] = [];

  public columnas = [
    { name: "Nombre Empresa", prop: "nombre" },
    { name: "Código", prop: "id" },
    { name: "País", prop: "pais.nombre" },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public empresaSeleccionada: Empresa | undefined;


  constructor(private empresaService: EmpresaService,
    private paisService: PaisService,
    public dialogService: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.listar();
    this.listarPaises();
  }

  public listar() {
    this.empresaService.listar().subscribe(
      respuesta => {
        this.empresas = respuesta;
      }
    );
  }

  public listarPaises() {
    this.paisService.listar().subscribe(
      respuesta => {
        this.paises = respuesta;
      }
    );
  }

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.empresaService.buscar(this.textoBusqueda).subscribe(
        respuesta => {
          this.empresas = respuesta;
        }
      );
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const dialogRef = this.dialogService.open(EmpresaEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Empresa:",
        empresa: new Empresa(
          0,
          "",
          new Pais(0, "", "", ""),
        ),
        paises: this.paises
      }
    });

    dialogRef.afterClosed().subscribe(
      datos => {
        if (datos) {
          this.empresaService.agregar(datos.empresa).subscribe(
            respuesta => {
              this.listar();
              window.alert("Los datos de la Empresa fueron agregados");
            }
          );
        }
      }, error => {
        window.alert(error.message)
      }
    );
  }

  public modificar() {
    if (this.empresaSeleccionada != null) {
      const dialogRef = this.dialogService.open(EmpresaEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando a datos de la Empresa [${this.empresaSeleccionada.nombre}]`,
          empresa: this.empresaSeleccionada,
          paises: this.paises
        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.empresaService.modificar(datos.empresa).subscribe(
              respuesta => {
                this.listar();
                window.alert("Los datos de la Empresa fueron modificados");
              }
            );
          }
        }, error => {
          window.alert(error.message)
        }
      );
    }
    else {
      window.alert("Debe seleccionar una Empresa");
    }
  }

  public verificarEliminar() {
    if (this.empresaSeleccionada != null) {
      const dialogRef = this.dialogService.open(DecidirComponent, {
        width: '400px',
        height: '200px',
        data: {
          titulo: `Elimnando registro de la Empresa [${this.empresaSeleccionada.nombre}]`,
          mensaje: "Está seguro?",
          id: this.empresaSeleccionada.id,
        }
      });

      dialogRef.afterClosed().subscribe(
        datos => {
          if (datos) {
            this.empresaService.eliminar(datos.id).subscribe(
              respuesta => {
                if (respuesta == true) {
                  this.listar();
                  window.alert("Los datos de la Empresa fueron eliminados");
                }
                else {
                  window.alert("No se pudo eliminar el registro de la empresa");
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
      window.alert("Debe seleccionar una Empresa");
    }
  }


  public onActivate(event: any) {
    if (event.type == 'click') {
      this.empresaSeleccionada = event.row;
    }
  }

}
