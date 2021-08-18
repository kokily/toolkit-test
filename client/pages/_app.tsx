import { AppProps } from 'next/app';
import wrapper from '../libs/configureStore';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
