import { CurrencyRawFetch,
  Dispatch,
  ExpenseType,
  ReduxState,
} from '../types';

type GetState = () => ReduxState;

export const setUser = (payload = { email: '' }) => {
  return {
    type: 'SET_USER',
    payload,
  };
};

function requestStarted() {
  return { type: 'REQUEST_STARTED' };
}

function requestCurrenciesSuccessful(currencies: string[]) {
  return {
    type: 'REQUEST_CURRENCIES_SUCCESSFUL',
    payload: currencies,
  };
}

function requestRatesSuccessful(exchangeRates: CurrencyRawFetch, expense: ExpenseType) {
  return {
    type: 'REQUEST_RATES_SUCCESSFUL',
    payload: { ...expense, exchangeRates },
  };
}

function requestFailed(error: string) {
  return {
    type: 'REQUEST_FAILED',
    payload: error,
  };
}

const fixData = (data: CurrencyRawFetch) => {
  // const dataArr = Object.entries(data).map((currency) => {
  //   return currency[1];
  // });
  const currenciesFiltered = Object.keys(data).filter((currency) => {
    return currency !== 'USDT';
  });
  return currenciesFiltered;
};

export function fetchCurrencies() {
  return async (dispatch: Dispatch, _getState: GetState) => {
    dispatch(requestStarted);
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const fixedData = fixData(data);
      dispatch(requestCurrenciesSuccessful(fixedData));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}

export function addExpense(expense: ExpenseType) {
  return async (dispatch: Dispatch, _getState: GetState) => {
    dispatch(requestStarted);
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(requestRatesSuccessful(data, expense));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}

export function removeExpense(id: number) {
  return {
    type: 'REMOVE_EXPENSE',
    payload: id,
  };
}

export function startEditExpense(idToEdit: number) {
  return {
    type: 'START_EDIT_EXPENSE',
    payload: idToEdit,
  };
}

export function endEditExpense(expense: ExpenseType) {
  return {
    type: 'END_EDIT_EXPENSE',
    payload: expense,
  };
}
