import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

const VALID_PASSWORD = '1234567';
const VALID_EMAIL = 'email@email.com';
const INVALID_PASSWORD = '123';
const INVALID_EMAIL = 'email';

describe('Testa as funcionalidades da página de Login', () => {
  it('O heading da página e elementos de input são renderizados', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const pswdInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(pswdInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  it('O botão de login está desabilitado se o e-mail não é válido', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const pswdInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeDisabled();

    await userEvent.type(emailInput, INVALID_EMAIL);
    await userEvent.type(pswdInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();
  });

  it('O botão de login está desabilitado se a senha não é válida', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const pswdInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeDisabled();

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(pswdInput, INVALID_PASSWORD);
    expect(loginBtn).toBeDisabled();
  });

  it('O botão de login está habilitado se as credenciais são válidas', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const pswdInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeDisabled();

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(pswdInput, VALID_PASSWORD);
    expect(loginBtn).toBeEnabled();
  });

  it('O botão de login redireciona para a página /carteira quando clicado', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const pswdInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeDisabled();

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(pswdInput, VALID_PASSWORD);
    expect(loginBtn).toBeEnabled();

    await userEvent.click(loginBtn);
    expect(screen.getByRole('heading', { name: /wallet/i })).toBeInTheDocument();
  });
});
