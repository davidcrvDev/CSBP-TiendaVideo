import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DatosLogin {
  usuario: "";
  clave: "";
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginform!: FormGroup;

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  submit() {
    debugger;
    if (this.loginform.valid) {
      console.log("formularo correcto");
    } else {
      console.log("formulario invalido");
      console.log("errores en el email: ", this.loginform.get('email')?.errors);
      console.log("errores en el password", this.loginform.get('password')?.errors);
    }
  }

  @Input() public dialogRef = MatDialogRef<LoginComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: DatosLogin
  ) { }

  onForgotPassword() {
    console.log('Olvidé mi contraseña clickeado');
    // Aquí puedes añadir la lógica para manejar el olvido de contraseña
  }

}
