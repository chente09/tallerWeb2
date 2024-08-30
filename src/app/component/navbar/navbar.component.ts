import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Path } from '../../utils/path';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  paths: Path[] = [
    { path: '/home', nombre: 'Home' },
    { path: '/productos', nombre: 'Productos' },
    { path: '/nosotros', nombre: 'Nosotros' }
  ]

  constructor(public usersService: UsersService) { }

  isLogged(): boolean { 
    return this.usersService.getCurrentUser() !== null;
  }

  logout(): void {
    this.usersService.logout();
  }
}
