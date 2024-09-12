import { Component } from '@angular/core';
import { CarritoService, CarritoItem } from '../../services/carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from '../../services/paypal/paypal.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carritoItems: CarritoItem[] = [];
  totalCarrito: number = 0;  // Nueva propiedad para almacenar el total

  constructor(
    private carritoService: CarritoService, 
    private route: ActivatedRoute, 
    private paypalService: PaypalService
  ) {}

  ngOnInit(): void {
    this.getCarrito();
    this.getTotalCarrito();  // Llama al método para obtener el total

    this.route.queryParams.subscribe(params => {
      console.log(params['paymentId']);
    });
  }

  pay(): void {
    
    this.carritoService.getTotalCarrito().subscribe(total => {
      this.paypalService.getAccessToken().subscribe(accessToken => {
        this.paypalService.createWebProfile(accessToken.access_token, `Pago-${Math.random()}`).subscribe(webProfile => {
          this.paypalService
            .createPayment(
              accessToken.access_token,
              webProfile.id,
              'http://localhost:4201/productos',  // URL de retorno
              'http://localhost:4201/login',   // URL de cancelación
              total  // Total del carrito como el 5to argumento
            )
            .subscribe(payment => {
              console.log(payment.id);
              window.location.href = payment.links[1].href;
            });
        });
      });
    });
  }

  getCarrito(): void {
    this.carritoService.getCarrito().subscribe(items => {
      this.carritoItems = items;
    });
  }

  // Método para obtener el total del carrito
  getTotalCarrito(): void {
    this.carritoService.getTotalCarrito().subscribe(total => {
      this.totalCarrito = total;  // Asigna el valor del total
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
