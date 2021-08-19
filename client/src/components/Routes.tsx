import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { AuthResponse } from '../libs/api/auth';

// Auth Routes
const LoginPage = loadable(() => import('../pages/auth/LoginPage'));

export const LoginRoutes = ({ user }: { user: AuthResponse | null }) => {
  if (!user) {
    localStorage.removeItem('paysys_token');
    document.location.href = '/';
  }

  return (
    <>
      {user && (
        <Switch>
          <Route exact path="/" />
          <Redirect from="*" to="/soldier" />
        </Switch>
      )}
    </>
  );
};

export const LogoutRoutes = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Redirect from="*" to="/" />
  </Switch>
);
