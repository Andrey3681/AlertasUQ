import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnumsService } from '../../../services/enums.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  ciudades: string[] = [];

  constructor(
    private fb: FormBuilder,
    private enumsService: EnumsService,
    private userService: UserService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.cargarCiudades();
  }

  cargarCiudades() {
    this.enumsService.obtenerCiudades().subscribe({
      next: (response) => {
        if (response.mensaje) {
          this.ciudades = response.mensaje;
        }
      },
      error: (error) => {
        console.error('Error al cargar ciudades:', error);
      }
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const usuarioData = this.signUpForm.value;
      this.userService.registrarUsuario(usuarioData).subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
        }
      });
    }
  }
}

