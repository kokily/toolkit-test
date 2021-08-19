import AuthForm from '../../components/auth/AuthForm';
import AuthTemplate from '../../components/auth/AuthTemplate';
import useAuth from './hooks/useAuth';

function LoginPage() {
  const auth = useAuth();

  return (
    <AuthTemplate mode="login">
      <AuthForm
        mode="login"
        username={auth.username}
        password={auth.password}
        onChange={auth.onChange}
        onSubmit={auth.onLogin}
      />
    </AuthTemplate>
  );
}

export default LoginPage;
