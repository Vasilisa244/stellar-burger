import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { OrderInfo } from '@components';
import { Modal } from '../../components/modal/modal';
import { IngredientDetails } from '@components';
import { useEffect, useState } from 'react';
import { AppHeader } from '@components';
import React from 'react';
import { checkUserAuth, authChecked } from '../../services/slices/userSlice';
import { fetchIngredient } from '../../services/slices/ingredientSlice';
import { Protected } from './protected-route';
import { useDispatch } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUserAuth()).finally(() => dispatch(authChecked()));
    dispatch(fetchIngredient());
  }, [dispatch]);

  const closeModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <Protected onlyUnAuth>
              <Login />
            </Protected>
          }
        />
        <Route
          path='/register'
          element={
            <Protected onlyUnAuth>
              <Register />
            </Protected>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <Protected onlyUnAuth>
              <ForgotPassword />
            </Protected>
          }
        />
        <Route
          path='/reset-password'
          element={
            <Protected onlyUnAuth>
              <ResetPassword />
            </Protected>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path='orders'
            element={
              <Protected>
                <ProfileOrders />
              </Protected>
            }
          />
          <Route
            path='orders/:number'
            element={
              <Protected>
                <OrderInfo />
              </Protected>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Информация об ингредиентах' onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Protected>
              <Modal title='Информация о заказе' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            </Protected>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={closeModal}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
