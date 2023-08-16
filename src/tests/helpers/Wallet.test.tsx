import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';

const VALID_PASSWORD = '1234567';
const VALID_EMAIL = 'email@email.com';

describe('Testa o funcionamento de Wallet', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });
  });
  it('Testa se o header mostra o e-mail fornecido no login e informações de despesas e câmbio', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const pswdInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(pswdInput, VALID_PASSWORD);
    await userEvent.click(loginBtn);

    expect(screen.getByRole('heading', { name: /wallet/i })).toBeInTheDocument();
    expect(screen.getByText(VALID_EMAIL)).toBeInTheDocument();
    expect(screen.getByText(/Despesas totais:/i)).toBeInTheDocument();
    expect(screen.getByText(/Câmbio utilizado:/i)).toBeInTheDocument();
  });

  it('Testa se são mostrados os elementos de form em Wallet', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const pswdInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(pswdInput, VALID_PASSWORD);
    await userEvent.click(loginBtn);

    const valueInput = screen.getByLabelText(/Valor da despesa/i);
    const descriptionInput = screen.getByLabelText(/Descrição da despesa/i);
    const currencyInput = screen.getByLabelText(/Moeda da despesa/i);
    const methodInput = screen.getByLabelText(/Método de pagamento/i);
    const tagInput = screen.getByLabelText(/Categoria/i);
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();

    await userEvent.type(valueInput, '100');
    await userEvent.type(descriptionInput, 'Teste');
    await userEvent.selectOptions(currencyInput, 'USD');
    await userEvent.selectOptions(methodInput, 'Dinheiro');
    await userEvent.selectOptions(tagInput, 'Alimentação');

    expect(valueInput).toHaveValue('100');
    expect(descriptionInput).toHaveValue('Teste');
    expect(currencyInput).toHaveValue('USD');
    expect(methodInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Alimentação');

    await userEvent.click(addButton);

    const totalExpenses = screen.getByText(/Despesas totais:/i);
    expect(totalExpenses).toBeInTheDocument();
    expect(totalExpenses).toHaveTextContent('475.31');
  });
});
