import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getProfile(userId: string) {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<any>(`${this.apiUrl}/customer/profile/${userId}`, { headers });
  }

  initWallet(userId: string) {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/wallet/initialize/${userId}`, {}, { headers });
  }

  // Método para crear el PaymentIntent
  createPaymentIntent(amount: number, cardDetails: any): Observable<{ clientSecret: string }> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<{ clientSecret: string }>(
        `${this.apiUrl}/stripe/create-payment-intent`,
        { amount, cardDetails }, // Enviar el monto y detalles de la tarjeta
        { headers }
    );
}

}
