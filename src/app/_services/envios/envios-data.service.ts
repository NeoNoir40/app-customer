import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviosDataService {
  private readonly PAQUETERIA_KEY = 'paqueteriaSeleccionada';
  private readonly QR_CODE_KEY = 'qrCodeData';

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

  setQRCodeData(data: string): void {
    localStorage.setItem(this.QR_CODE_KEY, data);
  }

  getQRCodeData(): string {
    const qrCodeData = localStorage.getItem(this.QR_CODE_KEY);
    console.log('Datos del código QR recuperados:', qrCodeData); // Para depuración
    return qrCodeData || '';
  }

  clearQRCodeData(): void {
    localStorage.removeItem(this.QR_CODE_KEY);
  }
}