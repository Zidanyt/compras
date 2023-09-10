// css
import style from './Navigation.module.css';


import React, { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate

const Navigation = () => {
  const [isManager, setIsManager] = useState(false);
  const [password, setPassword] = useState('');
  const managerPassword = 'adm'; // Defina sua senha de gerente aqui
  const navigate = useNavigate(); // Use o hook useNavigate para obter a função de navegação

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
    // Redirecionar para a página de produtos após o logout
    navigate('/products');
  };

  return (
    <nav className={style.container__nav}>
      <div className={style.nav__titulo}>
        <Icon.CartCheck size='30' />
        <h1>Aplicativo de Compras</h1>
      </div>
      <ul className={style.nav__ul } >
        <li className={style.nav__ul_li}>
          <Icon.HandbagFill size='20' />
          <Link to="/products">Produtos</Link>
        </li>
        <li className={style.nav__ul_li}>
          <Icon.Cart4 size='20' />
          <Link to="/cart">Carrinho</Link>
        </li>
        <li className={style.nav__ul_li}> 
          <Icon.CurrencyDollar size='20' />
          <Link to="/summary">Resumo do Pedido</Link>
        </li>
        {isManager ? (
          <>
            <li className={style.nav__ul_li}>
              <Icon.BagPlusFill size='20' />
              <Link to="/add">Adicionar Produto</Link>
            </li>
            <li className={style.nav__ul_li}>
              <Link to="/history">Historico</Link>
            </li>
            <li>
              <button onClick={handleLogoutClick}>Sair</button>
            </li>
          </>
        ) : (
          <li className={style.container__gerente}>
            <form action="/submit" method="post">
              <input
                className={style.input__gerente}
                type="password"
                placeholder="Senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <button className={style.button__gerente} onClick={handleLoginClick}>Entrar como Gerente</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
