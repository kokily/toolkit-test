import AuthForm from '../../components/auth/AuthForm';
import AuthTemplate from '../../components/auth/AuthTemplate';
import useAuth from './hooks/useAuth';

function RegisterPage() {
  const auth = useAuth();

  return (
    <AuthTemplate mode="register">
      <AuthForm
        mode="register"
        username={auth.username}
        password={auth.password}
        passwordConfirm={auth.passwordConfirm}
        onChange={auth.onChange}
        onSubmit={auth.onRegister}
      />
    </AuthTemplate>
  );
}

export default RegisterPage;
