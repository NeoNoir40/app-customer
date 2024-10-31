import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/_services/Wallet/wallet.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  
  constructor(private readonly walletService: WalletService) { }
  stripe: Stripe | null = null;
  cardNumber: string = '';
  expiry: string = '';
  cvc: string = '';

  isSidebarOpen: boolean = false;
  user_id: string = '';
  profile: any = {};
  cardElement: boolean = false;

  isModalOpen: boolean = false;
  rechargeAmount: number = 0;

  async ngOnInit(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.user_id = payload.id;
      }

      if (this.user_id) {
        console.log('ID de usuario obtenido:', this.user_id);
      }

      this.stripe = await loadStripe('pk_test_51QFIWwKI87ETN1cimHCsJcQ1fPk6HIXkSHDsKS0mNqjlqTyjpIkRykKQFMHRm7dm6fyBu4Dk7CZecQS2LZrfUjWC00wHQ3UCHO');
      this.getProfile();
    } catch (error) {
      console.error('Error al obtener el ID de usuario:', error);
      this.user_id = '';
    }
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  getProfile(): void {
    this.walletService.getProfile(this.user_id).subscribe(
      (response) => {
        console.log('Perfil de usuario:', response.data);
        this.profile = response.data;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }

  async createIntent(): Promise<void> {
    // Crea un objeto cardDetails con los datos de la tarjeta
    const cardDetails = {
        number: this.cardNumber,
        exp_month: this.expiry.split('/')[0],
        exp_year: this.expiry.split('/')[1],
        cvc: this.cvc,
    };

    // Llama a createPaymentIntent con el monto y los detalles de la tarjeta
    this.walletService.createPaymentIntent(this.rechargeAmount, cardDetails).subscribe(
        async (response) => {
            const clientSecret = response.clientSecret;
            console.log('Client Secret:', clientSecret);
            
            // Ahora realiza el pago usando Stripe
            const elements = this.stripe!.elements();
            const cardElement = elements.create('card');
            cardElement.mount('#card-element');

            const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.error('Error al procesar el pago:', error);
            } else {
                // Aquí puedes confirmar el Payment Intent
                const confirmResult = await this.stripe!.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                });

                if (confirmResult.error) {
                    console.error('Error al confirmar el pago:', confirmResult.error.message);
                } else {
                    // El pago fue exitoso
                    console.log('Pago exitoso!', confirmResult);
                    this.closeModal(); // Cierra el modal
                }
            }
        },
        (error) => {
            console.error('Error al crear el Payment Intent:', error);
        }
    );
}

}
