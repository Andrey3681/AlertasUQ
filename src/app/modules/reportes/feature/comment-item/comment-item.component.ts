import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentReplyComponent } from '../comment-reply/comment-reply.component';
import { Comentario } from '../../../../interfaces/comentario.interface';
import { ComentariosService } from '../../../../services/comentarios.service';


@Component({
    selector: 'app-comment-item',
    standalone: true,
    imports: [
        CommonModule,
        CommentReplyComponent
    ],
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent {
    @Input() comentario!: Comentario;
    @Output() respuestaEnviada = new EventEmitter<string>();
    
    mostrarRespuesta = false;
    error: string | null = null;

    constructor(private comentariosService: ComentariosService) {}

    toggleRespuesta() {
        this.mostrarRespuesta = !this.mostrarRespuesta;
    }

    onEnviarRespuesta(texto: string) {
        this.respuestaEnviada.emit(texto);
        this.mostrarRespuesta = false;
    }

    darLike() {
        if (this.comentario.id) {
            this.comentariosService.darLike(this.comentario.id)
                .subscribe({
                    next: () => {
                        if (this.comentario.likes === undefined) {
                            this.comentario.likes = 0;
                        }
                        this.comentario.likes!++;
                    },
                    error: (error) => {
                        console.error('Error al dar like:', error);
                        this.error = 'Error al dar like al comentario';
                    }
                });
        }
    }
}
