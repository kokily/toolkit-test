import PageTemplate from '../../components/common/PageTemplate';
import Home from '../../components/home/Home';
import useHome from './hooks/useHome';

function HomePage() {
  const home = useHome();

  return (
    <PageTemplate>
      <Home menu={home.menu} native={home.native} onMenu={home.onMenu} />
    </PageTemplate>
  );
}

export default HomePage;
