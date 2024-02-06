import { Table } from 'antd';
import { useAppSelector } from '../hooks';
import { SortOrder } from 'antd/es/table/interface';

interface DataType {
  title: string
  dataIndex: string
  sorter: (a: any, b: any) => number
  defaultSortOrder: SortOrder
}

const columns: DataType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    defaultSortOrder: 'descend',
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.rank - b.rank,
  }
];

export default function AssetsTable () {
  const assets = useAppSelector(state => state.assets.items)

  const data = assets.map(a => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
    rank: a.rank ,
  }))
    
  return <div>
    <Table bordered pagination={false} columns={columns} dataSource={data} />
  </div>
}