import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent implements OnInit {
  activarCuentaForm: FormGroup;
  mensaje: string = '';
  error: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router
  ) {
    this.activarCuentaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      codigoActivacion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Obtener el email del estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { email: string };
    if (state?.email) {
      this.activarCuentaForm.patchValue({ email: state.email });
    }
  }

  onSubmit() {
    if (this.activarCuentaForm.valid) {
      this.userService.activarCuenta(this.activarCuentaForm.value).subscribe({
        next: (response) => {
          this.mensaje = 'Cuenta activada correctamente';
          this.error = false;
          // Redirigir al login después de un breve delay
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (error) => {
          this.mensaje = error.error?.mensaje || 'Error al activar la cuenta';
          this.error = true;
          console.error('Error al activar la cuenta:', error);
        }
      });
    }
  }
}