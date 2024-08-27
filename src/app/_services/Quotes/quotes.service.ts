import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

interface QuoteRequest {
  pais_origen: string;
  pais_destino: string;
  cp_origen: string;
  cp_destino: string;
  alto: number;
  ancho: number;
  largo: number;
  peso: number;
  seguro: number;
  valor_declarado: number;
}

interface QuoteResponse {
  superenvios: {
    success: boolean;
    data: {
      paqueterias: any[];
    };
  };
  fedex: {
    success: boolean;
    data: {
      paqueterias: any[];
    };
  };
  paqueteexpress: {
    success: boolean;
    data: {
      paqueterias: any[];
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http: HttpClient) { }


  getQuote(quoteData: any): Observable<{ superenvios: { paqueterias: any[] }, fedex: any[], paqueteexpress: any[] }> {
    return this.http.post<QuoteResponse>(`${environment.apiUrl}/shipping/quote`, quoteData)
      .pipe(
        map(response => ({
          superenvios: {
            paqueterias: response.superenvios.success ? response.superenvios.data.paqueterias : []
          },
          fedex: response.fedex.success ? response.fedex.data.paqueterias : [],
          paqueteexpress: response.paqueteexpress.success ? response.paqueteexpress.data.paqueterias : []
        }))
      );
  }

}