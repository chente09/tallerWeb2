import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  collectionData
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Producto } from '../productos/productos.service';
import { UsersService } from '../users/users.service';
import { Auth, User } from '@angular/fire/auth';

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private userId: string | null = null;

  constructor(private firestore: Firestore, private usersService: UsersService, private auth: Auth) {
    this.auth.onAuthStateChanged(user => {
      this.userId = user?.uid || null;
    });
  }

  // Método para obtener el carrito del usuario
  getCarrito(): Observable<CarritoItem[]> {
    if (!this.userId) {
      throw new Error('User ID is not available.');
    }
    const carritoRef = collection(this.firestore, `carritos/${this.userId}/items`);
    return collectionData(carritoRef, { idField: 'id' }) as Observable<CarritoItem[]>;
  }

  // Método para agregar un producto al carrito
  async addToCarrito(producto: Producto, cantidad: number): Promise<void> {
    if (!this.userId) {
      throw new Error('User ID is not available.');
    }
    const carritoDocRef = doc(this.firestore, `carritos/${this.userId}/items/${producto.id}`);
    await setDoc(carritoDocRef, { producto, cantidad }, { merge: true });
  }

  // Método para eliminar un producto del carrito
  async removeFromCarrito(productoId: string): Promise<void> {
    if (!this.userId) {
      throw new Error('User ID is not available.');
    }
    const carritoDocRef = doc(this.firestore, `carritos/${this.userId}/items/${productoId}`);
    await deleteDoc(carritoDocRef);
  }

  // Método para actualizar la cantidad de un producto en el carrito
  async updateCantidad(productoId: string, cantidad: number): Promise<void> {
    if (!this.userId) {
      throw new Error('User ID is not available.');
    }
    const carritoDocRef = doc(this.firestore, `carritos/${this.userId}/items/${productoId}`);
    await setDoc(carritoDocRef, { cantidad }, { merge: true });
  }

  // Método para obtener la suma total del carrito
  getTotalCarrito(): Observable<number> {
    return this.getCarrito().pipe(
      map((items: CarritoItem[]) => 
        items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0)
      )
    );
  }
}
