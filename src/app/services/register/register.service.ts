import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  

  constructor() { }

  createRegister(userData: { email: string, password: string }, additionalData: any): Promise<any> {
    // Aquí va la lógica para registrar el usuario
    return new Promise((resolve, reject) => {
      // Simulación de registro exitoso
      resolve({ message: 'Usuario registrado exitosamente' });
    });
  }

  createRegisterWithGoogle(): Promise<any> {
    // Aquí va la lógica para registrar con Google
    return new Promise((resolve, reject) => {
      // Simulación de registro con Google exitoso
      resolve({ message: 'Usuario registrado con Google exitosamente' });
    });
  }
}
