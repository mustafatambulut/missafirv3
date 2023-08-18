export interface IPaymentState {
  creditCard: ICard;
}

export interface ICard {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus?: string;
}
