import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { AuthResponse } from '../libs/api/auth';

// Auth Routes
const LoginPage = loadable(() => import('../pages/auth/LoginPage'));
const RegisterPage = loadable(() => import('../pages/auth/RegisterPage'));

// Home Routes
const HomePage = loadable(() => import('../pages/home/HomePage'));
const ListMenuPage = loadable(() => import('../pages/home/ListMenuPage'));
const AddCartPage = loadable(() => import('../pages/home/AddCartPage'));

// Cart Routes
const CartPage = loadable(() => import('../pages/cart/CartPage'));

export const LoginRoutes = ({ user }: { user: AuthResponse | null }) => {
  if (!user) {
    localStorage.removeItem('paysys_token');
    document.location.href = '/';
  }

  return (
    <>
      {user && (
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/solider" />} />
          <Route exact path="/soldier" component={HomePage} />
          <Route exact path="/reserve" component={HomePage} />
          <Route exact path="/general" component={HomePage} />
          <Route exact path="/menu" component={ListMenuPage} />
          <Route path="/menu/:menuId" component={AddCartPage} />
          <Route exact path="/cart" component={CartPage} />

          <Redirect from="*" to="/soldier" />
        </Switch>
      )}
    </>
  );
};

export const LogoutRoutes = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
    <Redirect from="*" to="/" />
  </Switch>
);
