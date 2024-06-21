import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsUserChecked,
  selectUserData
} from '../../services/slices/userSlice';

type ProtectedProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
};

export const Protected = ({
  onlyUnAuth,
  children
}: ProtectedProps): JSX.Element => {
  const user = useSelector(selectUserData);
  const isAuthCheck = useSelector(selectIsUserChecked);
  const location = useLocation();

  if (!isAuthCheck) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  return children;
};
