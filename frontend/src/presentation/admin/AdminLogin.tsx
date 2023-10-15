import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminLogin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar o componente
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar se o token é válido fazendo uma chamada para o backend
      axios
        .post(`${process.env.REACT_APP_VERIFY_TOKEN_ENDPOINT}`, { token })
        .then((response) => {
          navigate('/admin/dashboard')
        })
    }
  }, [navigate]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      // Faz a requisição POST para a sua API backend
      const response = await axios.post(`${process.env.REACT_APP_LOGIN_AS_ADMIN}`, {
        email: email,
        password: password
      });

      const { user, token } = response.data;

      // Salva os dados do usuário e o token de acesso no localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      // Lógica de autenticação bem-sucedida, redirecionar para a página /admin/dashboard
      navigate('/admin/dashboard');
    } catch (error: any) {
      // Lógica para tratamento de erro, exibir mensagem de erro, etc.
      toast.error(`${error.response.data.error}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className="adminLogin">
      <div className="adminLogin_container">
        <h2 className="h3">Conecte-se:</h2>

        <form className='my-3' onSubmit={handleLogin}>
          <div className="input_container d-flex justify-content-center align-items-center">
            <input
              className="input_default"
              type="text"
              placeholder="Nome..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon
              icon="person-walking-arrow-right"
              className="mx-2 fa-lg icon-gray"
            />
          </div>

          <div className="input_container d-flex justify-content-center align-items-center">
            <input
              className="input_default"
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? 'eye-slash' : 'eye'}
              className="mx-2 fa-lg icon-gray"
              onClick={togglePasswordVisibility}
            />
          </div>

          <input className="input_submit-default my-3" type="submit" value="Entrar" />
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default AdminLogin;
