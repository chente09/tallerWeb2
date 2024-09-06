import { Component } from '@angular/core';
import { CarritoService, CarritoItem } from '../../services/carrito/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carritoItems: CarritoItem[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito(): void {
    this.carritoService.getCarrito().subscribe(items => {
      this.carritoItems = items;
    });
  }

  removeFromCarrito(productoId: string): void {
    this.carritoService.removeFromCarrito(productoId)
      .then(() => {
        alert('Producto eliminado del carrito');
        this.getCarrito(); // Actualizar la lista después de eliminar
      })
      .catch(error => {
        console.error('Error al eliminar producto del carrito:', error);
        alert('Error al eliminar producto del carrito');
      });
  }

  increaseQuantity(productoId: string, currentQuantity: number): void {
    this.carritoService.updateCantidad(productoId, currentQuantity + 1)
      .then(() => {
        alert('Cantidad aumentada');
        this.getCarrito(); // Actualizar la lista después de incrementar
      })
      .catch(error => {
        console.error('Error al aumentar la cantidad:', error);
        alert('Error al aumentar la cantidad');
      });
  }
}
