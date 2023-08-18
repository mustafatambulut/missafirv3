export interface IPaymentState {
  creditCard: ICreditCard;
}

export interface ICreditCard {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus?: string;
}
