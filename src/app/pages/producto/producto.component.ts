import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto
import { ActivatedRoute } from '@angular/router';
import { ProductService, Producto } from '../../services/productos/productos.service';
import { Observable } from 'rxjs';

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
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.producto$ = this.productService.getProductoById(id);
      }
    });
  }
}
