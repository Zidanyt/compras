import React, { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import './Navigation.module.css'
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isManager, setIsManager] = useState(false);
  const [password, setPassword] = useState('');
  const managerPassword = 'zidany'; // Defina sua senha de gerente aqui

  const handleLoginClick = () => {
    if (password === managerPassword) {
      setIsManager(true);
    } else {
      alert('Senha incorreta. Tente novamente.');
    }
  };

  const handleLogoutClick = () => {
    setIsManager(false);
    setPassword(''); // Limpar senha ao fazer logout
  };

  return (
    <nav>
      <div>
        <Icon.CartCheck size='30' />
        <h1>Aplicativo de Compras</h1>
      </div>
      <ul>
        <li>
          <Icon.HandbagFill size='20' />
          <Link to="/products">Produtos</Link>
        </li>
        <li>
          <Icon.Cart4 size='20' />
          <Link to="/cart">Carrinho</Link>
        </li>
        <li>
          <Icon.CurrencyDollar size='20' />
          <Link to="/summary">Resumo do Pedido</Link>
        </li>
        {isManager ? (
          <>
            <li>
              <Icon.BagPlusFill size='20' />
              <Link to="/add">Adicionar Produto</Link>
            </li>
            <li>
              <button onClick={handleLogoutClick}>Sair</button>
            </li>
          </>
        ) : (
          <li>
            <input
              type="password"
              placeholder="Senha de Gerente"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLoginClick}>Entrar como Gerente</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;