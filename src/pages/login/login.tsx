import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchLogin } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValues(() => ({
      ...loginValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchLogin({ email: loginValues.email, password: loginValues.password })
    );
  };

  return (
    <LoginUI
      errorText=''
      email={loginValues.email}
      setEmail={handleInputChange}
      password={loginValues.password}
      setPassword={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
