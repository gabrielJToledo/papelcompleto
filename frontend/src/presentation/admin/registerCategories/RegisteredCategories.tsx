import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import './RegisteredCategories.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RegisteredCategories() {
  const getCategoriesFromDB = useAppSelector((state) => state.categories.categories);

  const handleDeleteCategory = (categoryId: any) => {
    axios
      .delete(`${process.env.REACT_APP_DELETE_CATEGORY}${categoryId}`)
      .then((response) => {
        toast.success('Categoria excluída com sucesso!');
      })
      .catch((error) => {
        toast.error('Erro ao excluir categoria. Por favor, tente novamente.');
      });
  };

  return (
    <div className="createProduct">
      <div className="createProduct_container">
        <h2 className="fw-bold">Categorias Cadastradas</h2>

        <div className="createProduct_card">
          {getCategoriesFromDB === null || getCategoriesFromDB.length === 0 ? (
            <h2 className='m-0 h6'>Nenhuma categoria cadastrada.</h2>
          ) : (
            getCategoriesFromDB.map((category: any) => (
              <div className="category_card d-flex align-items-center justify-content-between px-3 my-2" key={category._id}>
                <h2 className="h6 m-0">{category.name}</h2>
                <FontAwesomeIcon
                  icon="trash-can"
                  className="delete_icon mx-2 fa-lg"
                  onClick={() => handleDeleteCategory(category._id)}
                />
              </div>
            ))
          )}
        </div>
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

export default RegisteredCategories;
