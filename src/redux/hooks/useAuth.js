import { useSelector } from 'react-redux';
// prettier-ignore
import { selectUser, selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/authSelectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);

  return {
    isLoggedIn,
    user,
    isRefreshing,
  };
};
