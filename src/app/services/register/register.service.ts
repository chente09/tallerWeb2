import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  

  constructor() { }

  createRegister(userData: { email: string, password: string }, additionalData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({ message: 'Usuario registrado exitosamente' });
    });
  }

  createRegisterWithGoogle(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({ message: 'Usuario registrado con Google exitosamente' });
    });
  }
}
