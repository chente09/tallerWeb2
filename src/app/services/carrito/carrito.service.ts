import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  setDoc,
  deleteDoc,
  collection,
  collectionData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Producto } from '../productos/productos.service';

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private userId = 'usuario123'; // Asegúrate de implementar una forma de obtener el ID del usuario autenticado

  constructor(private firestore: Firestore) { }

  // Método para obtener el carrito del usuario
  getCarrito(): Observable<CarritoItem[]> {
    const carritoRef = collection(this.firestore, `carritos/${this.userId}/items`);
    return collectionData(carritoRef, { idField: 'id' }) as Observable<CarritoItem[]>;
  }

  // Método para agregar un producto al carrito
  async addToCarrito(producto: Producto, cantidad: number): Promise<void> {
    const carritoDocRef = doc(this.firestore, `carritos/${this.userId}/items/${producto.id}`);
    await setDoc(carritoDocRef, { producto, cantidad }, { merge: true });
  }

  // Método para eliminar un producto del carrito
  async removeFromCarrito(productoId: string): Promise<void> {
    const carritoDocRef = doc(this.firestore, `carritos/${this.userId}/items/${productoId}`);
    await deleteDoc(carritoDocRef);
  }

  // Método para actualizar la cantidad de un producto en el carrito
  async updateCantidad(productoId: string, cantidad: number): Promise<void> {
    const carritoDocRef = doc(this.firestore, `carritos/${this.userId}/items/${productoId}`);
    await setDoc(carritoDocRef, { cantidad }, { merge: true });
  }
}
