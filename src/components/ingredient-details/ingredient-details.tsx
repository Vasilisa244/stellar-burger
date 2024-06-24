import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  selectIngredients,
  selectIngredient,
  setIngredient,
  fetchIngredient
} from '../../services/slices/ingredientSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const ingredientData = useSelector(selectIngredient);
  const ingredients = useSelector(selectIngredients);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!ingredients) {
        await dispatch(fetchIngredient());
      }
      await dispatch(setIngredient(id));
    };

    fetchData();
  }, [dispatch, ingredients, id]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
