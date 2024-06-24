import { ChangeEvent, FC, SyntheticEvent, useState, FormEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { fetchRegisterUser } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

export const Register: FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    return { userData, handleChange, setUserData };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser(userData));
  };

  return (
    <RegisterUI
      errorText=''
      email={userData.email}
      userName={userData.name}
      password={userData.password}
      handleSubmit={handleSubmit}
      setEmail={handleChange}
      setPassword={handleChange}
      setUserName={handleChange}
    />
  );
};
