import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService, Producto } from '../../services/productos/productos.service';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] = [];

  constructor(private productService: ProductService, private carritoService: CarritoService ) {}

  ngOnInit(): void {  
    this.getProductos();
  }

  getProductos(): void{
    this.productService.getProducto().subscribe(ps=>this.productos=ps);
  }
 
  addToCarrito(producto: Producto, cantidad: number = 1): void {
    this.carritoService.addToCarrito(producto, cantidad)
      .then(() => {
        alert('Producto agregado al carrito');
      })
      .catch(error => {
        console.error('Error al agregar producto al carrito:', error);
        alert('Error al agregar producto al carrito');
      });
  }
}
