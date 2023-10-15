import React, { useState } from 'react'
import './CreateCategory.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function CreateCategory() {
    const [category, setCategory] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_CREATE_CATEGORY}`, { name: category }).then((res) => {
            toast.success(`${res.data.success}`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setCategory('');
        }).catch((error) => {
            toast.error(`${error.response.data}`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        })
    };


    return (
        <div className="createProduct">
            <div className="createProduct_container">
                <h2 className='fw-bold'>Nova Categoria</h2>
                <form onSubmit={handleSubmit}>
                    <div className="createProduct_card">
                        <h2 className='h5 fw-bold'>Categoria</h2>
                        <input
                            className='input_admin'
                            type="text"
                            placeholder='Nome da categoria...'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="createProduct_submit">
                        <button className="button-3" type="submit">Salvar Alterações</button>
                        <button className="button-2">Cancelar</button>
                    </div>
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

export default CreateCategory;