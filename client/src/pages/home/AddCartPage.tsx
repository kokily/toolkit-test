import PageTemplate from '../../components/common/PageTemplate';
import Loading from '../../components/common/Loading';
import useReadMenu from './hooks/useReadMenu';
import AddCart from '../../components/home/AddCart';

function AddCartPage() {
  const menu = useReadMenu();

  if (menu.readItemLoading) return <Loading />;

  return (
    <PageTemplate>
      <AddCart
        menu={menu.menu}
        count={menu.count}
        onChangeCount={menu.onChangeCount}
        price={menu.price}
        onChangePrice={menu.onChangePrice}
        onBack={menu.onBack}
        onSubmit={menu.onAddCart}
      />
    </PageTemplate>
  );
}

export default AddCartPage;
