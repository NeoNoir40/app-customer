import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ShipmentData } from 'src/app/models/shipmentData';

interface StateMapping {
  [key: string]: string;
}

interface CountryData {
  isoCode: string;
  states: StateMapping;
  alternateNames?: string[];

}
interface Paqueteria {
  nombre: string;
  proveedor: string;
  imagen: string;
  tiempo_de_entrega: string;
  precio: number;
  nombre_servicio: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnviosDataService {
  private readonly apiUrl = environment.apiUrl;
  private readonly PAQUETERIA_KEY = 'paqueteriaSeleccionada';
  private readonly QR_CODE_KEY = 'qrCodeData';
  private countryMappings: { [key: string]: CountryData } = {
    'México': {
      isoCode: 'MX',
      alternateNames: ['Mexico', 'mexico', 'méxico', 'MEXICO', 'MÉXICO', 'Mejico', 'mejico'],
      states: {
        'Aguascalientes': 'AG',
        'Baja California': 'BC',
        'Baja California Sur': 'BS',
        'Campeche': 'CM',
        'Chiapas': 'CS',
        'Chihuahua': 'CH',
        'Coahuila': 'CO',
        'Colima': 'CL',
        'Ciudad de México': 'CMX',
        'Durango': 'DG',
        'Guanajuato': 'GT',
        'Guerrero': 'GR',
        'Hidalgo': 'HG',
        'Jalisco': 'JA',
        'México': 'MX',
        'Michoacán': 'MI',
        'Morelos': 'MO',
        'Nayarit': 'NA',
        'Nuevo León': 'NL',
        'Oaxaca': 'OA',
        'Puebla': 'PU',
        'Querétaro': 'QT',
        'Quintana Roo': 'QR',
        'San Luis Potosí': 'SL',
        'Sinaloa': 'SI',
        'Sonora': 'SO',
        'Tabasco': 'TB',
        'Tamaulipas': 'TM',
        'Tlaxcala': 'TL',
        'Veracruz': 'VE',
        'Yucatán': 'YU',
        'Zacatecas': 'ZA',
      }
    }
  };
  constructor(private http: HttpClient) { }

  setPaqueteriaSeleccionada(paqueteria: any, provedor: any): void {
    localStorage.setItem(this.PAQUETERIA_KEY, JSON.stringify(paqueteria));
    localStorage.setItem('proveedor', provedor);
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
    console.log('Guardando datos del código QR:', data); // Para depuración
    localStorage.setItem(this.QR_CODE_KEY, data);
  }

  private normalizeText(text: string): string {
    return text
      .normalize('NFD') // Descompone los caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos
      .toLowerCase() // Convierte a minúsculas
      .trim(); // Elimina espacios al inicio y final
  }

  private getStateVariations(stateName: string): string[] {
    const normalized = this.normalizeText(stateName);
    const variations = [
      stateName,
      normalized,
      stateName.toUpperCase(),
      this.capitalizeWords(normalized),
      // Variaciones específicas para estados con "de"
      normalized.replace(' de ', ' '),
      normalized.replace(' del ', ' '),
      // Variaciones con/sin espacios
      normalized.replace(/\s+/g, ''),
      normalized.replace(/\s+/g, '_')
    ];
    return [...new Set(variations)]; // Elimina duplicados
  }

  private capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  }

  getCountryISOCode(countryName: string): string {
    console.log('Obteniendo códigos ISO para:', countryName); // Para depur
    const normalizedInput = this.normalizeText(countryName);

    for (const [country, data] of Object.entries(this.countryMappings)) {
      const normalizedCountry = this.normalizeText(country);
      const alternateNames = data.alternateNames?.map(name => this.normalizeText(name)) || [];

      if (normalizedInput === normalizedCountry || alternateNames.includes(normalizedInput)) {
        return data.isoCode;
      }
    }

    return '';
  }


  getStateISOCode(countryName: string, stateName: string): string {
    console.log('Obteniendo códigos ISO para:', countryName, stateName); // Para depuración
    const country = this.findCountry(countryName);
    if (!country) return '';

    const normalizedStateName = this.normalizeText(stateName);

    // Buscar en todas las variaciones posibles del nombre del estado
    for (const [state, code] of Object.entries(country.states)) {
      const variations = this.getStateVariations(state);
      if (variations.some(variation => this.normalizeText(variation) === normalizedStateName)) {
        return code;
      }
    }

    return '';
  }

  private findCountry(countryName: string): CountryData | null {
    const normalizedInput = this.normalizeText(countryName);

    for (const [country, data] of Object.entries(this.countryMappings)) {
      const normalizedCountry = this.normalizeText(country);
      const alternateNames = data.alternateNames?.map(name => this.normalizeText(name)) || [];

      if (normalizedInput === normalizedCountry || alternateNames.includes(normalizedInput)) {
        return data;
      }
    }

    return null;
  }


  getLocationCodes(countryName: string, stateName: string): {
    countryCode: string,
    stateCode: string,
    isValid: boolean,
    pais: string,
    estado: string,
    normalizedCountry: string,
    normalizedState: string
  } {
    const countryCode = this.getCountryISOCode(countryName);
    const stateCode = this.getStateISOCode(countryName, stateName);

    console.log('Códigos ISO obtenidos:', countryCode, stateCode); // Para depuración
    console.log('País:', countryName, 'Estado:', stateName); // Para depuración

    return {
      countryCode,
      stateCode,
      pais: countryName,
      estado: stateName,
      isValid: Boolean(countryCode && stateCode),
      normalizedCountry: this.normalizeText(countryName),
      normalizedState: this.normalizeText(stateName)
    };
  }


  getSuggestions(countryName: string, partialState: string): string[] {
    const country = this.findCountry(countryName);
    if (!country) return [];

    const normalizedInput = this.normalizeText(partialState);
    const suggestions: string[] = [];

    for (const state of Object.keys(country.states)) {
      if (this.normalizeText(state).includes(normalizedInput)) {
        suggestions.push(state);
      }
    }

    return suggestions;
  }



  getQRCodeData(): string {
    // console.log('Recuperando datos del código QR...'); // Para depuración

    const qrCodeData = localStorage.getItem(this.QR_CODE_KEY);



    // console.log('Datos del código QR recuperados:', qrCodeData); // Para depuración
    return qrCodeData || '';
  }

  clearQRCodeData(): void {
    localStorage.removeItem(this.QR_CODE_KEY);
  }

  createShipment(shipmentData: ShipmentData, user_id: string): Observable<any> {

    const accessToken = localStorage.getItem('access_token');

    const headers = ({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'

    });
    return this.http.post<any>(`${this.apiUrl}/shipments/create-customer/${user_id}`, shipmentData, { headers });
  }


  getUserShipments(user_id:string,page: number = 1, limit: number = 10, sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc'): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = ({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http.get<any>(`${this.apiUrl}/shipments/list-shipments/${user_id}`, { headers, params });
  }

  getShipmentDetails(shipmentId: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = ({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/shipments/details/${shipmentId}`, { headers });
    
  }



}