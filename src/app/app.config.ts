import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideClientHydration(), 
    // Inicialización de app-pokemon
    provideFirebaseApp(() => initializeApp({
      "projectId": "app-pokemon-9a58f",
      "appId": "1:301046760346:web:ae45007dcd5a258e083023",
      "storageBucket": "app-pokemon-9a58f.appspot.com",
      "apiKey": "AIzaSyBrBqSZIGGtsXc_HUtwD18CWoj2hrWiU8U",
      "authDomain": "app-pokemon-9a58f.firebaseapp.com",
      "messagingSenderId": "301046760346"
    })),
    provideAuth(() => getAuth()), 
    provideAnalytics(() => getAnalytics()), 
    ScreenTrackingService, 
    UserTrackingService, 
    provideFirestore(() => getFirestore()), 
    provideStorage(() => getStorage())
  ]
};
