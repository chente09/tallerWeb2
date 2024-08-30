import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../utils/producto';
import { Promo } from '../../utils/promo';
import * as productoData from '../../../../public/json/productoData.json';
import * as promoData from '../../../../public/json/promoData.json';
import {Router, RouterLink, RouterLinkActive } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Corregido 'styleUrl' a 'styleUrls'
})
export class HomeComponent implements AfterViewInit {
  productos: Producto[] = (productoData as any).default;
  promos: Promo[] = (promoData as any).default;

  constructor(private el: ElementRef, private router: Router) {}

  ngAfterViewInit(): void {
    $(this.el.nativeElement).find('.testimonial-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      margin: 30,
      dots: true,
      loop: true,
      center: true,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        }
      }
    });
  }

  ngOnInit(): void { }
  onClickProducto(): void {
    this.router.navigate(['/productos']);
  }
}
