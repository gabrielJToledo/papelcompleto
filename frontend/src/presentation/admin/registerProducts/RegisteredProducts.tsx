import React, { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import './RegisteredProducts.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Buffer } from 'buffer';
import { Modal, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import axios from 'axios';

function RegisteredProducts() {
  const getProductsFromDB: any = useAppSelector((state) => state.products.products);
  const categories = useAppSelector((state => state.categories.categories))
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [coverImage, setCoverImage]: any = useState(null);
  const [images, setImages]: any = useState(null);

  const handleModalOpen = (product: any) => {
    setSelectedProduct(product);
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
    setDiscountPrice(product.discountPrice);
    setCoverImage(null);
    setImages(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DELETE_PRODUCT}${productId}`);
      toast.success('Produto deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar o produto.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discountPrice', discountPrice);
    formData.append('coverImage', coverImage);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }


    axios.put(`${process.env.REACT_APP_UPDATE_PRODUCT}${selectedProduct._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res: any) => {
        toast.success(res.data);
        setShowModal(false);
      }).catch((error) => {
        toast.error(error.response.data.error);
      })


  };

  return (
    <div className="createProduct">
      <div className="createProduct_container">
        <h2 className="fw-bold">Produtos Cadastrados</h2>

        <div className="createProduct_card createProduct_card-registeredP">
          <div className="cardProducts">
            <div className="cardProducts_title">
              <p className="p_regs_prod">Produto</p>
              <p className="p_regs_price">Preço</p>
              <p className="p_regs_actions">Ações</p>
            </div>
          </div>

          {getProductsFromDB === null || getProductsFromDB.length === 0 ? (
            <h2 className="m-0 h6">Nenhum produto cadastrado.</h2>
          ) : (
            getProductsFromDB.map((product: any) => {
              // Converte o buffer para base64, se necessário
              const imageBuffer = product.coverImage.data; // Substitua "product.image.data" pelo caminho correto do buffer da imagem
              const base64Image = Buffer.from(imageBuffer).toString('base64');
              const imageUrl = `data:image/jpeg;base64,${base64Image}`;

              return (
                <div className="d-flex align-items-center justify-content-between px-3 my-2" key={product._id}>
                  <div className="product_regs_container">
                    <img src={imageUrl} alt={product.name} className="product_regs_img" />
                    <h2 className="h6">{product.name}</h2>
                  </div>

                  <div className="price_regs_container">
                    <p className="m-0 px-3">R$ {product.price}</p>
                  </div>

                  <div className="actions_regs_container">
                    <FontAwesomeIcon
                      icon="pen-to-square"
                      title="Editar Produto"
                      className="edit_icon mx-4 fa-lg"
                      onClick={() => handleModalOpen(product)}
                    />
                    <FontAwesomeIcon
                      icon="trash-can"
                      title="Deletar Produto"
                      className="delete_icon mx-4 fa-lg"
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <ToastContainer />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="createProduct_card">
              <h2 className="h5 fw-bold">Nome e Descrição</h2>
              <label>Nome</label>
              <input
                className="input_admin"
                type="text"
                placeholder="Nome do produto..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Categoria</label>
              <select
                className="input_admin"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Selecione a categoria...</option>
                {categories !== null &&
                  categories.map((category: any) => {
                    return <option value={category.name}>{category.name}</option>;
                  })}
              </select>
              <label>Descrição</label>
              <ReactQuill value={description} onChange={setDescription} />
            </div>

            <div className="createProduct_card">
              <h2 className="h5 fw-bold">Fotos</h2>
              <label>Foto de capa</label>
              <input
                className="input_admin_file"
                type="file"
                onChange={(e: any) => setCoverImage(e.target.files[0])}
              />

              <label>Fotos galeria</label>
              <input
                className="input_admin_file"
                type="file"
                onChange={(e: any) => setImages(e.target.files)}
                multiple
              />
            </div>

            <div className="createProduct_card">
              <h2 className="h5 fw-bold">Preços</h2>
              <label>Preço de venda</label>
              <input
                className="input_admin"
                type="text"
                placeholder="Preço de venda"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Preço promocional</label>
              <input
                className="input_admin"
                type="text"
                placeholder="Preço Promocional"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>

            <div className="createProduct_submit">
              <Button className="button-3" type="submit">
                Salvar Alterações
              </Button>
              <Button className="button-2" onClick={handleModalClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RegisteredProducts;
