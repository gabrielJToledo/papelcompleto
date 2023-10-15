import axios from 'axios';
import './AdminDash.css'
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { nome_site } from '../../Global';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AdminDash() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar o componente
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar se o token é válido fazendo uma chamada para o backend
      axios
        .post(`${process.env.REACT_APP_VERIFY_TOKEN_ENDPOINT}`, { token })
        .then((response) => {
          setAuthenticated(true);
        })
        .catch((error) => {
          setAuthenticated(false);
          console.log(error);
          navigate('/admin'); // Navega para a página de login caso ocorra um erro de autenticação
        });
    } else {
      setAuthenticated(false);
      navigate('/admin'); // Navega para a página de login se não houver um token
    }
  }, [navigate]);

  if (!authenticated) {
    return null; // Ou renderize uma mensagem de erro ou um componente de carregamento
  }

  // Renderizar o conteúdo do AdminDash se o usuário estiver autenticado
  return (
    <div className="adminDash">
      <div className="adminDash_menu_container">
        <h2 className='text-center h5 my-2 fw-bold'>{nome_site}</h2>

        <div className="administrate_menu my-4">
          <h2 className='h6'>Administrar</h2>
          <Link className='link_menu_admin' to={'/admin/dashboard/users'}><FontAwesomeIcon icon="person-walking-with-cane" className='mx-2 fa-lg' /> Usuários Cadastrados</Link>
          <Link className='link_menu_admin' to={'/admin/dashboard/registeredProducts'}><FontAwesomeIcon icon="bars-progress" className='mx-2 fa-lg' /> Produtos Cadastrados</Link>
          <Link className='link_menu_admin' to={'/admin/dashboard/registeredCategories'}><FontAwesomeIcon icon="bars-progress" className='mx-2 fa-lg' /> Categorias Cadastradas</Link>
          <Link className='link_menu_admin' to={'/admin/dashboard/createProduct'}><FontAwesomeIcon icon="download" className='mx-2 fa-lg' /> Criar Produtos</Link>
          <Link className='link_menu_admin' to={'/admin/dashboard/createCategory'}><FontAwesomeIcon icon="calendar" className='mx-2 fa-lg' /> Criar Categoria</Link>
        </div>

        <div className="administrate_menu my-4">
          <h2 className='h6'>Estatísticas</h2>
          <Link className='link_menu_admin' to={'/admin/dashboard/sales'}><FontAwesomeIcon icon="receipt" className='mx-2 fa-lg' /> Vendas</Link>
        </div>
      </div>

      <div className="adminDash_container">
        <div className="adminDash_container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
