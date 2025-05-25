import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../services/toker.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarEliminacionComponent } from '../confirmar-eliminacion/confirmar-eliminacion.component';
import { EditarUsuarioDTO, EliminarUsuarioDTO } from '../../../interfaces/user.interface';
import { RespuestaDTO } from '../../../interfaces/respesta.interfaces';
@Component({
  selector: 'app-ver-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-perfil.component.html',
  styleUrl: './ver-perfil.component.css'
})
export class VerPerfilComponent implements OnInit {
  id: string = '';
  nombre: string = '';
  ciudad = {
    nombre: ''
  };
  direccion: string = '';
  email: string = '';
  telefono: string = '';
  fechaRegistro: Date = new Date();

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const idUsuario = this.tokenService.getIdUsuario();
    if (idUsuario) {
      this.userService.obtenerUsuarioPorId(idUsuario).subscribe({
        next: (data) => {
          const usuario = data.mensaje;
          this.id = usuario.id;
          this.nombre = usuario.nombre;
          this.ciudad.nombre = usuario.ciudad;
          this.direccion = usuario.direccion || '';
          this.email = usuario.email;
          this.telefono = usuario.telefono || '';
          this.fechaRegistro = new Date(usuario.fechaRegistro);
        },
        error: (error) => {
          console.error('Error al cargar datos del usuario:', error);
        }
      });
    }
  }
  editarDatos() {
    const editarUsuario: EditarUsuarioDTO = {
      id: this.id,
      nombre: this.nombre,
      ciudad: this.ciudad.nombre,
      direccion: this.direccion
    };
    this.userService.editarUsuario(editarUsuario).subscribe({
      next: (response: RespuestaDTO) => {
        this.snackBar.open('Datos actualizados exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (error: any) => {
        this.snackBar.open('Error al actualizar los datos', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        console.error('Error al actualizar los datos:', error);
      }
    });
  }

  eliminarCuenta() {
    const dialogRef = this.dialog.open(ConfirmarEliminacionComponent, {
      width: '400px',
      data: { mensaje: '¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const eliminarUsuario: EliminarUsuarioDTO = {
          id: this.id,
          password: result.password
        };
        
        this.userService.eliminarUsuario(eliminarUsuario).subscribe({
          next: (response: RespuestaDTO) => {
            this.snackBar.open('Cuenta eliminada exitosamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.tokenService.logout();
            this.router.navigate(['/login']);
          },
          error: (error: any) => {
            this.snackBar.open('Error al eliminar la cuenta', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            console.error('Error al eliminar la cuenta:', error);
          }
        });
      }
    });
  }

  salir() {
  this.tokenService.logout();
  this.router.navigate(['/login']);
  }
}
