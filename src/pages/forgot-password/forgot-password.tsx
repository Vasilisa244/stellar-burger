import { ChangeEvent, FC, SyntheticEvent, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [profileValues, setProfileValues] = useState({
    email: ''
  });
  const [error, setError] = useState<Error | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProfileValues({
      ...profileValues,
      [name]: value
    });
    return { profileValues, handleChange, setProfileValues };
  };

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi({ email: profileValues.email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={profileValues.email}
      setEmail={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
