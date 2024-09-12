import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Producto } from '../../services/productos/productos.service';
import { Observable } from 'rxjs';
import { CarritoService } from '../../services/carrito/carrito.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  producto$: Observable<Producto> | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private carritoService: CarritoService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.producto$ = this.productService.getProductoById(id);
      }
    });
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
