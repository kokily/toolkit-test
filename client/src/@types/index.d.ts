interface HomeMenuType {
  id: number;
  divide: string;
}

interface ItemType {
  id: string;
  num: number;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
}

interface ItemState {
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: string;
}

interface MenuType {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}

interface CartType {
  id: string;
  user_id: string;
  completed: boolean;
  deleted: boolean;
  bill_id: string;
  items: ItemType[] | null;
}
