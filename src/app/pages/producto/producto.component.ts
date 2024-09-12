import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto
import { ActivatedRoute } from '@angular/router';
import { ProductService, Producto } from '../../services/productos/productos.service';
import { Observable } from 'rxjs';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule], // Asegúrate de que CommonModule esté aquí
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  producto$: Observable<Producto> | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.producto$ = this.productService.getProductoById(id);
      }
    });
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
