import { Bill } from '../entities/Bill';

export function getSortedCount(array: any[]) {
  const counts = array.reduce((pv, cv) => {
    pv[cv] = (pv[cv] || 0) + 1;
    return pv;
  });

  const result: any[] = [];

  for (let key in counts) {
    result.push([key, counts[key]]);
  }

  return result;
}

export function getSortedList(list: Bill[]) {
  type ValueType = {
    name: string;
    count: number;
  };

  let prevList: string[] = [];
  let sortData: ValueType[] = [];

  list.map((bill) => {
    prevList.push(bill.title);
  });

  const nextList = getSortedCount(prevList);

  sortData = nextList.map((item) => ({
    name: item[0],
    count: item[1],
  }));

  return sortData;
}
