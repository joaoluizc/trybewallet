// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CurrencyData, ExpenseType, ExpenseWithRatesType } from '../types';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  errorMessage: '',
  expenses: <ExpenseWithRatesType[]>[],
  isEditing: false,
  idToEdit: -1,
};

type ActionType = {
  payload: CurrencyData[] | string | boolean | ExpenseType | string[] | number;
  type: string;
};

const editExpenses = (state = INITIAL_STATE, editedExpense: ExpenseType) => {
  return state.expenses.map((expense) => {
    if (expense.id === state.idToEdit) {
      return { ...editedExpense, exchangeRates: expense.exchangeRates };
    }
    return expense;
  });
};

function wallet(state = INITIAL_STATE, action: ActionType) {
  switch (action.type) {
    case 'REQUEST_STARTED':
      return { ...state, isFetching: true };
    case 'REQUEST_CURRENCIES_SUCCESSFUL':
      return {
        ...state,
        currencies: action.payload,
        isFetching: false,
      };
    case 'REQUEST_RATES_SUCCESSFUL':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        isFetching: false,
      };
    case 'REQUEST_FAILED':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    case 'START_EDIT_EXPENSE':
      return { ...state, isEditing: true, idToEdit: action.payload };
    case 'END_EDIT_EXPENSE':
      return {
        ...state,
        isEditing: false,
        expenses: editExpenses(state, action.payload as ExpenseType),
      };
    default:
      return { ...state };
  }
}

export default wallet;
