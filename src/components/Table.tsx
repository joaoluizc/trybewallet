import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../redux/types';
import { removeExpense, startEditExpense } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(removeExpense(id));
  };
  return (
    <div className="expenses-table">
      <h2>Despesas</h2>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const currencyName = expense.exchangeRates[expense.currency].name;
              const exchangeRate = Number(expense.exchangeRates[expense.currency].ask);
              const convertedValue = (expense.value * exchangeRate);
              return (
                <tr key={ expense.id }>
                  <td
                    key={ String(expense.description).concat(String(Date.now())) }
                  >
                    { expense.description }
                  </td>
                  <td
                    key={ String(expense.tag).concat(String(Date.now())) }
                  >
                    { expense.tag }
                  </td>
                  <td
                    key={ String(expense.method).concat(String(Date.now())) }
                  >
                    { expense.method }
                  </td>
                  <td
                    key={ String(expense.value).concat(String(Date.now())) }
                  >
                    { Number(expense.value).toFixed(2) }
                  </td>
                  <td
                    key={ String(expense.currency).concat(String(Date.now())) }
                  >
                    { currencyName }
                  </td>
                  <td
                    key={ String(exchangeRate).concat(String(Date.now())) }
                  >
                    { exchangeRate.toFixed(2) }
                  </td>
                  <td
                    key={ String(convertedValue).concat(String(Date.now())) }
                  >
                    { convertedValue.toFixed(2) }
                  </td>
                  <td
                    key={ 'BRL'.concat(String(Date.now())) }
                  >
                    Real
                  </td>
                  <td
                    key={ 'edit/delete'.concat(String(Date.now())) }
                  >
                    <button
                      data-testid="edit-btn"
                      onClick={ () => dispatch(startEditExpense(expense.id)) }
                    >
                      Editar
                    </button>
                    <button
                      onClick={ () => handleDelete(expense.id) }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
