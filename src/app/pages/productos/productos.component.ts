import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService, Producto } from '../../services/productos/productos.service';
import { CarritoService } from '../../services/carrito/carrito.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] = [];

  constructor(
    private usersService: UsersService, 
    private productService: ProductService, 
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productService.getProducto().subscribe(ps => this.productos = ps);
  }


  async addToCarrito(producto: Producto, cantidad: number = 1): Promise<void> {
    const user = this.usersService.getCurrentUser();
    if (user) {
      try {
        await this.carritoService.addToCarrito(producto, cantidad);
        alert('Producto agregado al carrito');
      } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        alert('Error al agregar producto al carrito');
      }
    } else {
      alert('Debe iniciar sesión para agregar productos al carrito');
    }
  }
}
