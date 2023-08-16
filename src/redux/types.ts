import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ReduxState = {
  user: {
    email: string;
  };
  wallet: {
    currencies: string[];
    expenses: ExpenseWithRatesType[],
    isFetching: boolean;
    errorMessage: string;
    isEditing: boolean;
    idToEdit: number;
  };
};

export type CurrencyRawFetch = {
  [key: string]: CurrencyData;
};

export type CurrencyData = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;

export type ExpenseType = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
};

export type ExpenseWithRatesType = {
  id: number;
  value: number;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: CurrencyRawFetch;
};
