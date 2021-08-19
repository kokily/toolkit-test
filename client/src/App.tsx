import Loading from './components/common/Loading';
import { LoginRoutes, LogoutRoutes } from './components/Routes';
import useMe from './libs/hooks/useMe';
import GlobalStyle from './libs/styles';

function App() {
  const { user, meLoading } = useMe();

  if (meLoading) return <Loading />;

  return (
    <>
      <GlobalStyle />
      {user ? <LoginRoutes user={user} /> : <LogoutRoutes />}
    </>
  );
}

export default App;
