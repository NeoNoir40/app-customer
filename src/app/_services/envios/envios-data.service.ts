import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviosDataService {
  private readonly PAQUETERIA_KEY = 'paqueteriaSeleccionada';

  setPaqueteriaSeleccionada(paqueteria: any): void {
    localStorage.setItem(this.PAQUETERIA_KEY, JSON.stringify(paqueteria));
  }

  getPaqueteriaSeleccionada(): any {
    const paqueteriaString = localStorage.getItem(this.PAQUETERIA_KEY);
    console.log('Paquetería string recuperada:', paqueteriaString); // Para depuración
    if (paqueteriaString) {
      try {
        return JSON.parse(paqueteriaString);
      } catch (e) {
        console.error('Error al parsear la paquetería:', e);
        return null;
      }
    }
    return null;
  }

  clearPaqueteriaSeleccionada(): void {
    localStorage.removeItem(this.PAQUETERIA_KEY);
  }
}