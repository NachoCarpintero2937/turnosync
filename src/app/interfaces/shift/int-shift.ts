export interface IntShift {
    id: number;
    service_id: number;
    client_id: number;
    user_id: number;
    date_shift: string;
    description: string;
    price: string;
    status: number;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      name: string;
      email: string;
      // Otros campos del usuario
    };
    service: {
      id: number;
      name: string;
      user_id: number;
      price_id: number;
      // Otros campos del servicio
    };
    client: {
      id: number;
      name: string;
      email: string;
      phone: string;
      date_birthday: string;
      // Otros campos del cliente
    };
}
