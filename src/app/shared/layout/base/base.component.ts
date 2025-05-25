import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { NavbarModeradorComponent } from '../navbar-moderador/navbar-moderador.component';
import { TokenService } from '../../../services/toker.service';
@Component({
  selector: 'app-base',
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    NavbarModeradorComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  rol: string = '';
  estado: string = '';
  constructor(
    protected tokenService: TokenService,
    protected router: Router
  ) {
    const token = this.tokenService.getToken();
    console.log('TOKEN:', token);
  
    const payload = token ? this.tokenService['decodePayload'](token) : null;
    console.log('PAYLOAD:', payload);
  
    this.rol = this.tokenService.getRol();
    console.log('ROL ACTUAL:', this.rol);

    this.estado = this.tokenService.getEstado();
    console.log('ESTADO ACTUAL:', this.estado);

  }
}
