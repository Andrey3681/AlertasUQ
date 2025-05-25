import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentReplyComponent } from '../../comment-reply/comment-reply.component';
import { Comentario } from '../../../../../interfaces/comentario.interface';
import { FormsModule } from '@angular/forms';
import { CommentItemComponent } from '../../comment-item/comment-item.component';
import { ComentariosService } from '../../../../../services/comentarios.service';

@Component({
    selector: 'app-comment-list',
    standalone: true,
    imports: [
        CommonModule,
        CommentItemComponent,
        FormsModule
    ],
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
    @Input() reporteId!: string;
    comentarios: Comentario[] = [];
    nuevoComentario: string = '';
    loading = false;
    error: string | null = null;

    constructor(private comentariosService: ComentariosService) {}

    ngOnInit() {
        this.cargarComentarios();
        
        this.comentariosService.loading$.subscribe(
            loading => this.loading = loading
        );

        this.comentariosService.error$.subscribe(
            error => this.error = error
        );
    }

    cargarComentarios() {
        if (this.reporteId) {
            this.comentariosService.obtenerComentariosPorReporte(this.reporteId)
                .subscribe({
                    next: (comentarios) => {
                        this.comentarios = comentarios;
                    },
                    error: (error) => {
                        console.error('Error al cargar comentarios:', error);
                        this.error = 'Error al cargar los comentarios';
                    }
                });
        }
    }

    enviarComentario() {
        if (!this.nuevoComentario.trim()) return;

        const comentario: Comentario = {
            texto: this.nuevoComentario,
            autorId: 'USER_ID', // Esto debería venir del servicio de autenticación
            autorNombre: 'Usuario Actual', // Esto debería venir del servicio de autenticación
            autorInicial: 'U',
            fechaCreacion: new Date(),
            reporteId: this.reporteId
        };

        this.comentariosService.agregarComentario(comentario)
            .subscribe({
                next: (nuevoComentario) => {
                    this.comentarios.unshift(nuevoComentario);
                    this.nuevoComentario = '';
                },
                error: (error) => {
                    console.error('Error al agregar comentario:', error);
                    this.error = 'Error al publicar el comentario';
                }
            });
    }

    onRespuestaEnviada(comentarioPadre: Comentario, textoRespuesta: string) {
        const respuesta: Comentario = {
            texto: textoRespuesta,
            autorId: 'USER_ID', // Esto debería venir del servicio de autenticación
            autorNombre: 'Usuario Actual', // Esto debería venir del servicio de autenticación
            autorInicial: 'U',
            fechaCreacion: new Date(),
            reporteId: this.reporteId,
            parentId: comentarioPadre.id
        };

        this.comentariosService.agregarRespuesta(comentarioPadre.id!, respuesta)
            .subscribe({
                next: (nuevaRespuesta) => {
                    if (!comentarioPadre.respuestas) {
                        comentarioPadre.respuestas = [];
                    }
                    comentarioPadre.respuestas.push(nuevaRespuesta);
                },
                error: (error) => {
                    console.error('Error al agregar respuesta:', error);
                    this.error = 'Error al publicar la respuesta';
                }
            });
    }
}
