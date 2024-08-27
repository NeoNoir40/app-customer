import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { QuotesService } from 'src/app/_services/Quotes/quotes.service';

interface QuoteResponse {
  data: {
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
    };
  };
}

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

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.scss']
})
export class CotizarComponent {
  quotes: { superenvios: any[]; fedex: any[]; paqueteexpress: any[] } | undefined;
  origenPostal: string = '';
  destinoPostal: string = '';
  altura: number | null = null;
  ancho: number | null = null;
  largo: number | null = null;
  peso: number | null = null;
  tipoSeleccionado: 'paquete' | 'sobre' | null = null;
  isSidebarOpen: boolean = false;
  seguroSeleccionado: 'si' | 'no' | null = 'no';
  valorDeclarado: number | null = null;
  showSeguroSection: boolean = false;

  box_lottie: AnimationOptions = {
    path: '../../../assets/lotties/box-open.json',
  };

  constructor(
    private router: Router,
    private quotesService: QuotesService
  ) { }

  seleccionarSeguro(seguro: 'si' | 'no') {
    this.seguroSeleccionado = seguro;
  }

  seleccionarTipo(tipo: 'paquete' | 'sobre') {
    this.tipoSeleccionado = tipo;
    this.altura = null;
    this.ancho = null;
    this.largo = null;
    this.peso = null;
    this.showSeguroSection = tipo === 'paquete';
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  isLoading = false;

  onSubmit() {
    this.isLoading = true;

    const cotizacionRequest: QuoteRequest = {
      pais_origen: 'MX',
      pais_destino: 'MX',
      cp_origen: this.origenPostal,
      cp_destino: this.destinoPostal,
      alto: this.altura || 0,
      ancho: this.ancho || 0,
      largo: this.largo || 0,
      peso: this.peso || 0,
      seguro: this.seguroSeleccionado === 'si' ? 1 : 0,
      valor_declarado: this.seguroSeleccionado === 'si' ? this.valorDeclarado || 0 : 0
    };

    this.quotesService.getQuote(cotizacionRequest)
      .subscribe(
        (response) => {
          console.log('Respuesta de cotización:', response);
          this.navigateToPackages(response);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener la cotización:', error);
          this.isLoading = false;
        }
      );
  }

  navigateToPackages(response: { superenvios: { paqueterias: any[] }, fedex: any[], paqueteexpress: any[] }) {
    this.router.navigate(['/paqueterias'], { state: response });
  }


  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}