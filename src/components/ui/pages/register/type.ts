import { PageUIProps } from '../common-type';
import { ChangeEvent } from 'react';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: (e: ChangeEvent<HTMLInputElement>) => void;
  setUserName: (e: ChangeEvent<HTMLInputElement>) => void;
};
