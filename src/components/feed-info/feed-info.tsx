import { FC } from 'react';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectTotal,
  selectOrders,
  selectTotalToday
} from '../../services/slices/feedSlice';

const fetchOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const feed = {
    total: useSelector(selectTotal),
    totalToday: useSelector(selectTotalToday)
  };

  const readyOrders = fetchOrders(orders, 'done');

  const pendingOrders = fetchOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
