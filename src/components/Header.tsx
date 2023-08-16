import { useSelector } from 'react-redux';
import React from 'react';
import { ReduxState } from '../redux/types';

function Header() {
  const rootState = useSelector((store: ReduxState) => store);
  const totalExpenses = rootState.wallet.expenses
    .reduce((acc, curr) => {
      const { ask } = curr.exchangeRates[curr.currency];
      const total = acc + (curr.value * Number(ask));
      return total;
    }, 0);
  return (
    <div className="header-container">
      <h1 className="login-title-trybe">
        Trybe
        <span className="login-title-wallet">Wallet</span>
      </h1>
      <div className="header-info">
        <h3 data-testid="email-field">{ rootState.user.email }</h3>
        <p>
          Despesas totais:
          { ' ' }
          <span data-testid="total-field">
            { totalExpenses.toFixed(2) }
          </span>
        </p>
        <p>
          Câmbio utilizado:
          { ' ' }
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    </div>
  );
}

export default Header;
