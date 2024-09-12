import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  addDoc,
  collection,
  collectionData,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
  nombre: string;
  marca: string;
  imagen: string;
  precio: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  // Método para obtener todos los productos
  getProducto(): Observable<Producto[]> {
    const productoRef = collection(this.firestore, 'productos');
    return collectionData(productoRef, { idField: 'id' });
  }

  // Nuevo método para obtener un producto por ID
  getProductoById(id: string): Observable<Producto> {
    const productoDocRef = doc(this.firestore, `productos/${id}`);
    return docData(productoDocRef, { idField: 'id' }) as Observable<Producto>;
  }

  createProducto(producto: Producto): Promise<any> {
    const productoRef = collection(this.firestore, 'productos');
    return addDoc(productoRef, producto);
  }

  updateProducto(producto: Producto): Promise<any> {
    const docRef = doc(this.firestore, `productos/${producto.id}`);
    return updateDoc(docRef, { ...producto });
  }

  deleteProducto(producto: Producto): Promise<any> {
    const docRef = doc(this.firestore, `productos/${producto.id}`);
    return deleteDoc(docRef);
  }
}
