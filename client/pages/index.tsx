import { NextPage } from 'next';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import useMe from './hooks/useMe';

const IndexPage: NextPage = () => {
  const { auth, meLoading } = useMe();
  const { username, password, loginError, onChange, onLogin, onLogout } =
    useAuth();

  useEffect(() => {
    if (loginError) {
      console.log(loginError);
    }
  }, []);

  if (meLoading) return null;

  return (
    <div>
      {auth ? (
        <>
          <div>
            {auth.username}님 접속 중<br />
            이분은 관리자가 {auth.admin ? '맞습니다' : '아닙니다'}
          </div>

          <div>
            <button onClick={onLogout}>로그아웃</button>
          </div>
        </>
      ) : (
        <>
          <h3>Login</h3>

          <form>
            <div>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <div>
              <button onClick={onLogin}>로그인</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default IndexPage;
