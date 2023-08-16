import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Dispatch, ReduxState } from '../redux/types';
import { addExpense, endEditExpense, fetchCurrencies } from '../redux/actions';

const INITIAL_WALLET_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

function WalletForm() {
  const rootState = useSelector((state: ReduxState) => state);
  const dispatch: Dispatch = useDispatch();
  const [formState, setFormState] = useState(INITIAL_WALLET_STATE);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const handleAddExpense = () => {
    const { value, description, currency, method, tag } = formState;
    const currentExpenses = rootState.wallet.expenses;
    const expense = {
      id: currentExpenses.length,
      value,
      currency,
      method,
      tag,
      description,
    };
    dispatch(addExpense(expense));
    setFormState(INITIAL_WALLET_STATE);
  };

  const handleEditExpense = () => {
    const { value, description, currency, method, tag } = formState;
    const expense = {
      id: rootState.wallet.idToEdit,
      value,
      currency,
      method,
      tag,
      description,
    };
    dispatch(endEditExpense(expense));
    setFormState(INITIAL_WALLET_STATE);
  };

  return (
    <div className="wallet-form-container">
      <label className="expense-value">
        Valor da despesa
        <input
          type="text"
          data-testid="value-input"
          value={ formState.value }
          onChange={
            (e) => setFormState({
              ...formState,
              value: e.target.value,
            })
          }
        />
      </label>
      <label className="expense-description">
        Descrição da despesa
        <input
          type="text"
          data-testid="description-input"
          value={ formState.description }
          onChange={
            (e) => setFormState({
              ...formState,
              description: e.target.value,
            })
          }
        />
      </label>
      <div className="break1" />
      <label className="expense-currency">
        Moeda da despesa
        <select
          data-testid="currency-input"
          value={ formState.currency }
          onChange={
            (e) => setFormState({
              ...formState,
              currency: e.target.value,
            })
          }
        >
          { rootState.wallet.currencies.map((currency) => {
            return (
              <option
                value={ currency }
                key={ currency }
              >
                { currency }
              </option>
            );
          }) }
        </select>
      </label>
      <label className="expense-method">
        Método de pagamento
        <select
          data-testid="method-input"
          value={ formState.method }
          onChange={
            (e) => setFormState({
              ...formState,
              method: e.target.value,
            })
          }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label className="expense-tag">
        Categoria
        <select
          data-testid="tag-input"
          value={ formState.tag }
          onChange={
            (e) => setFormState({
              ...formState,
              tag: e.target.value,
            })
          }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <div className="break2" />
      <button
        className="expense-submit-btn"
        onClick={
          () => (rootState.wallet.isEditing
            ? handleEditExpense()
            : handleAddExpense())
        }
      >
        { rootState.wallet.isEditing ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    </div>
  );
}

export default WalletForm;
