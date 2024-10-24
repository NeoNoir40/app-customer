export interface ShipmentData {
    user_id: string;
    shipment_type: 'Paquete' | 'Sobre';
    from: Address;
    to: Address;
    payment: Payment;
    packing: Packing;
    shipment_data: ShipmentDimensions;
    insurance: string;
    cost: string;
    price: string;
    extra_price: string;
    discount: string;
    status: 'Entregado' | 'En recolección' | 'Enviado' | 'Problema' | 'Pendiente';
    dagpacket_profit: string;
    utilitie_dag: string;
    utilitie_lic: string;
    description: string;
    provider: string;
    apiProvider: string;
    idService: string;
    isInternational: boolean;
  }
    
     export interface Address {
      name: string;
      phone: string;
      email: string;
      street: string;
      city: string;
      state: string;
      country: string;
      country_code: string;
      settlement: string;
      zip_code: string;
      municipality: string;
      external_number: string;
      internal_number?: string;
      reference?: string;
    }
    
    export interface Payment {
      method: 'saldo' | 'efectivo' | 'td-debito' | 'td-credito';
      status: 'Pendiente' | 'Pagado' | 'Reembolsado';
    }
    
    export interface Packing {
      answer: string;
      packing_id?: string;
      packing_type: string;
      packing_cost: string;
    }
    
    export interface ShipmentDimensions {
      height: number;
      width: number;
      length: number;
      package_weight: number;
      volumetric_weight?: number;
    }

