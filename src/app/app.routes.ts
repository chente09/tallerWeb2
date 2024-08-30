import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProductoComponent } from './pages/producto/producto.component';
import {ProductosComponent} from "./pages/productos/productos.component";
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'producto/:id', component: ProductoComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: Error404Component }
];
