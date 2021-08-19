import Loading from '../../components/common/Loading';
import PageTemplate from '../../components/common/PageTemplate';
import ListMenu from '../../components/home/ListMenu';
import useListMenu from './hooks/useListMenu';

function ListMenuPage() {
  const menu = useListMenu();

  if (menu.listItemsLoading) return <Loading />;

  return (
    <PageTemplate>
      <ListMenu menu={menu.items} onBack={menu.onBack} onMenu={menu.onMenu} />
    </PageTemplate>
  );
}

export default ListMenuPage;
