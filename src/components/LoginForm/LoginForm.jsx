import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authOperations';
import css from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      login({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input className={css.loginFormInput} type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input className={css.loginFormInput} type="password" name="password" />
      </label>
      <button className={css.loginFormBtn} type="submit">
        Log In
      </button>
    </form>
  );
};
