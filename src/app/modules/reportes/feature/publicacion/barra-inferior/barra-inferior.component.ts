import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { ComentariosService } from '../../../../../services/comentarios.service';

import { MensajeDTO } from '../../../../../interfaces/mensaje.interface';
import { Comentario } from '../../../../../interfaces/comentario.interface';
import { ReportesService } from '../../../../../services/reportes.service';


@Component({
    selector: 'app-barra-inferior',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule],
    templateUrl: './barra-inferior.component.html',
    styleUrl: './barra-inferior.component.css'
})
// ... existing code ...

// ... existing code ...

export class BarraInferiorComponent implements OnInit {
    @Input() reporteId!: string;
    @Input() esImportante: boolean = false;
    @Input() estaGuardado: boolean = false;
    @Input() cantidadComentarios: number = 0;

    nuevoComentario: string = '';
    loading: boolean = false;
    error: string | null = null;

    constructor(
        private dialog: MatDialog,
        private reportesService: ReportesService,
        private comentariosService: ComentariosService
    ) {}

    ngOnInit() {
        // Subscribe to both services' loading and error states
        this.reportesService.loading$.subscribe(
            loading => this.loading = loading
        );

        this.reportesService.error$.subscribe(
            error => this.error = error
        );

        this.comentariosService.loading$.subscribe(
            loading => this.loading = loading
        );

        this.comentariosService.error$.subscribe(
            error => this.error = error
        );
    }

    marcarImportante() {
        if (this.loading) return;

        const dto = { id: this.reporteId };
        if (this.esImportante) {
            this.reportesService.quitarImportante(dto).subscribe({
                next: (response: MensajeDTO<string>) => {
                    this.esImportante = false;
                    // Aquí podrías mostrar un mensaje de éxito
                },
                error: (error) => {
                    console.error('Error al quitar importante:', error);
                    this.error = 'Error al quitar importante';
                }
            });
        } else {
            this.reportesService.marcarImportante(dto).subscribe({
                next: (response: MensajeDTO<string>) => {
                    this.esImportante = true;
                    // Aquí podrías mostrar un mensaje de éxito
                },
                error: (error) => {
                    console.error('Error al marcar importante:', error);
                    this.error = 'Error al marcar importante';
                }
            });
        }
    }

    guardar() {
        if (this.loading) return;

        const dto = { id: this.reporteId };
        if (this.estaGuardado) {
            this.reportesService.quitarFavorito(dto).subscribe({
                next: (response: MensajeDTO<string>) => {
                    this.estaGuardado = false;
                    // Aquí podrías mostrar un mensaje de éxito
                },
                error: (error) => {
                    console.error('Error al quitar favorito:', error);
                    this.error = 'Error al quitar favorito';
                }
            });
        } else {
            this.reportesService.marcarFavorito(dto).subscribe({
                next: (response: MensajeDTO<string>) => {
                    this.estaGuardado = true;
                    // Aquí podrías mostrar un mensaje de éxito
                },
                error: (error) => {
                    console.error('Error al marcar favorito:', error);
                    this.error = 'Error al marcar favorito';
                }
            });
        }
    }

    enviarComentario() {
        if (this.loading || !this.nuevoComentario.trim()) return;
        
        const comentario: Comentario = {
            texto: this.nuevoComentario,
            autorId: 'USER_ID', // TODO: Get from auth service
            autorNombre: 'Usuario Actual', // TODO: Get from auth service
            autorInicial: 'U', // TODO: Get from auth service
            fechaCreacion: new Date(),
            reporteId: this.reporteId
        };

        this.comentariosService.agregarComentario(comentario)
            .subscribe({
                next: (nuevoComentario) => {
                    this.nuevoComentario = '';
                    this.cantidadComentarios++;
                    // Here you could show a success message
                },
                error: (error) => {
                    console.error('Error al enviar comentario:', error);
                    this.error = 'Error al publicar el comentario';
                }
            });
    }

    verComentarios() {
        const dialogRef = this.dialog.open(CommentListComponent, {
            width: '600px',
            data: { reporteId: this.reporteId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cantidadComentarios = result;
            }
        });
    }
}