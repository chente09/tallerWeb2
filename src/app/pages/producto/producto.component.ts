import { Component } from '@angular/core';
import { Producto } from '../../utils/producto';
import * as productoData from '../../../../public/json/productoData.json';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Path } from '../../utils/path';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  producto?: Producto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id= params.get('id');
      this.producto=((productoData as any).default as Producto[]).find((producto) => producto.id === Number(id));
    })
  }
}
