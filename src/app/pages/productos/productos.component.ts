import { Component } from '@angular/core';
import { Producto } from '../../utils/producto';
import * as productoData from '../../../../public/json/productoData.json';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Path } from '../../utils/path';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] = (productoData as any).default;

  paths: Path[] = [
    { path: '/home', nombre: 'Home' },
    { path: '/productos', nombre: 'Productos' },
    { path: '/nosotros', nombre: 'Nosotros' }
  ]
}
