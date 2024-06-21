import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectConstructorBurger,
  clearBasket
} from '../../services/slices/constructorBurgerSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router';
import {
  fetchNewOrder,
  selectModalOrder,
  selectOrderRequest,
  clearOrederData,
  clearModalOrder
} from '../../services/slices/orderSlice';
import { selectUserData } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const constructorItems = useSelector(selectConstructorBurger);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectModalOrder);
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const onOrderClick = () => {
    if (!user) return navigate('/login');

    if (!constructorItems.bun || orderRequest) return;

    const bunId = constructorItems.bun._id;
    const ingredientsId = constructorItems.ingredients.reduce(
      (acc: string[], ingredient) => [...acc, ingredient._id],
      []
    );

    const order = [bunId, ...ingredientsId, bunId];
    dispatch(fetchNewOrder(order)).finally(() => dispatch(clearBasket()));
  };
  const closeOrderModal = () => {
    dispatch(clearModalOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
