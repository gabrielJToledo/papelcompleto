import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './Register.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch } from '../../store/hooks';
import { getCurrentUserFromDB } from '../../store/ducks/user/actions';
import { useNavigate } from 'react-router-dom';

function Register() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_USER_SIGNIN}`, {
            name: nomeCompleto,
            email: email,
            whatsapp: whatsapp,
            password: password,
            confirmPassword: confirmPassword
        }).then(() => {
            toast.success('Usuário criado!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                axios.post(`${process.env.REACT_APP_USER_LOGIN}`, {
                    email: email,
                    password: password,
                }).then((response) => {
                    const currentUserFromDB = response.data;

                    console.log(currentUserFromDB)

                    localStorage.setItem('userPayload', JSON.stringify(currentUserFromDB));

                    dispatch(getCurrentUserFromDB(currentUserFromDB))

                    navigate('/home')
                }).catch((error) => {
                    toast.error(`${error.response.data}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
            }, 1500)

        }).catch((error) => {
            toast.error(`${error.response.data}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    };

    return (
        <div className="register d-flex justify-content-center my-5">
            <div className="wrapper d-flex justify-content-center align-items-center">
                <div className="register_card">
                    <form className='d-flex flex-column justify-content-center h-100 p-3' onSubmit={handleSubmit}>
                        <h2 className='text-center text-secondary fw-100'>Criar Conta</h2>

                        <input
                            className='input_register'
                            placeholder='Nome Completo'
                            type="text"
                            value={nomeCompleto}
                            onChange={(e) => setNomeCompleto(e.target.value)}
                        />

                        <InputMask
                            className='input_register'
                            placeholder='E-mail'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <InputMask
                            mask="(99) 99999-9999"
                            className='input_register'
                            placeholder='Whatsapp'
                            type="text"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />

                        <input
                            className='input_register'
                            placeholder='Senha'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            className='input_register'
                            placeholder='Confirmação de Senha'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <input className='submit_register' type="submit" value="Criar" />
                    </form>
                </div>
            </div>
            <ToastContainer

            />
        </div>
    );
}

export default Register;
