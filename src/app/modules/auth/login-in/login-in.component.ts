import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/toker.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { LOGIN_VALIDATION, LoginDTO } from '../../../interfaces/login.interface';

@Component({
  selector: 'app-login-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-in.component.html',
  styleUrl: './login-in.component.css'
})
export class LoginInComponent implements OnInit {
  loginForm!: FormGroup;
  validationMessages = LOGIN_VALIDATION;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.isSubmitting = true;
    const loginDTO = this.loginForm.value as LoginDTO;
  
    this.authService.login(loginDTO).subscribe({
      next: (response) => {
        console.log('Respuesta del login:', response); // Para debug
    
        // Si el backend retorna el token como string en 'mensaje'
        const token = typeof response.mensaje === 'string'
          ? response.mensaje
          : response.mensaje.token; // Por si acaso algún día es un objeto
    
        this.tokenService.login(token);
    
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (error) => {
        if (error.status === 403 && error.error?.mensaje) {
          this.router.navigate(['/activar-cuenta']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: error.error?.mensaje || 'Error desconocido'
          });
        }
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  // Getters para facilitar la validación en el template
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}