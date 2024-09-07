import { NavLink } from 'react-router-dom';
import { useAuth } from '../../redux/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authOperations';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav>
      {isLoggedIn ? (
        <NavLink to="/logout" onClick={handleLogout}>
          Log Out
        </NavLink>
      ) : (
        <div>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </div>
      )}
    </nav>
  );
};
