export interface IPaymentState {
  creditCard: ICard;
  isValidPayload?: null | boolean;
}

export interface ICard {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus?: string;
  preliminary?: boolean;
  distance?: boolean;
  message?: string;
}
