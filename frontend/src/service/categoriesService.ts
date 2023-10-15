import { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../store/hooks';
import { getCategoriesFromDB } from '../store/ducks/categories/actions';

export const useGetCategoriesFromDB = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ALL_CATEGORIES_API}`);
        dispatch(getCategoriesFromDB(response.data));
      } catch (error) {
        console.error('Erro ao obter produtos do banco de dados:', error);
      }
    };

    fetchData();
  }, [dispatch]);
};
