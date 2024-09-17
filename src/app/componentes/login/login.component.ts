import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DatosLogin {
  usuario: "";
  clave: "";
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  @Input() public dialogRef = MatDialogRef<LoginComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: DatosLogin
  ) { }

  onForgotPassword() {
    console.log('Olvidé mi contraseña clickeado');
    // Aquí puedes añadir la lógica para manejar el olvido de contraseña
  }

}
