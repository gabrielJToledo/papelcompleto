import React, { useState } from 'react'
import './CreateProduct.css'
import ReactQuill from 'react-quill';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '../../../store/hooks';

function CreateProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [coverImage, setCoverImage]: any = useState(null);
  const [images, setImages]: any = useState(null);
  const categories = useAppSelector((state => state.categories.categories))

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discountPrice', discountPrice);
    formData.append('coverImage', coverImage);
    formData.append('images', images);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    axios.post(`${process.env.REACT_APP_CREATE_PRODUCT}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      toast.success(`${res.data}`);

      // Limpar os campos após o envio bem-sucedido
      setName('');
      setCategory('');
      setDescription('');
      setPrice('');
      setDiscountPrice('');
      setCoverImage(null);
      setImages(null);
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
        <h2 className='fw-bold'>Novo Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="createProduct_card">
            <h2 className='h5 fw-bold'>Nome e Descrição</h2>
            <label>Nome</label>
            <input
              className='input_admin'
              type="text"
              placeholder='Nome do produto...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Categoria</label>
            <select
              className='input_admin'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione a categoria...</option>
              {categories !== null && categories.map((category: any) => {
                return <option value={category.name}>{category.name}</option>
              })}
            </select>
            <label>Descrição</label>
            <ReactQuill value={description} onChange={setDescription} />
          </div>

          <div className="createProduct_card">
            <h2 className='h5 fw-bold'>Fotos</h2>
            <label>Foto de capa</label>
            <input className='input_admin_file' type="file" onChange={(e: any) => setCoverImage(e.target.files[0])} />

            <label>Fotos galeria</label>
            <input className='input_admin_file' type="file" onChange={(e: any) => setImages(e.target.files)} multiple />
          </div>

          <div className="createProduct_card">
            <h2 className='h5 fw-bold'>Preços</h2>
            <label>Preço de venda</label>
            <input
              className='input_admin'
              type="text"
              placeholder='Preço de venda'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Preço promocional</label>
            <input
              className='input_admin'
              type="text"
              placeholder='Preço Promocional'
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
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

export default CreateProduct;