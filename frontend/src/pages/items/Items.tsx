import { useState } from 'react';
import {
  DataTable,
  type DataTableQuery,
  type DataTableColumn,
} from '../../components/organisms/DataTable';
import type { Item } from '../../api/interfaces/item-interfaces';
import Loader from '../../components/atoms/Spinner';
import { toast } from 'sonner';
import { useItems } from '../../api/hooks/query/item-hooks';

export default function ItemsPage() {
  const [query, setQuery] = useState({});
  const onQueryChange = (newQuery: DataTableQuery) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      ...newQuery,
    }));
  };

  const { data, isLoading, error } = useItems(query);

  const columns: DataTableColumn[] = [
    {
      key: 'code',
      type: 'string',
      label: 'Kod',
      filterable: true,
    },
    {
      key: 'name',
      type: 'string',
      label: 'Nazwa',
      sortable: true,
      filterable: true,
    },
    {
      key: 'size',
      type: 'string',
      label: 'Rozmiar',
      filterable: true,
    },
    {
      key: 'gender',
      type: 'enum',
      label: 'Płeć',
      sortable: true,
      filterable: true,
      enumValues: ['męski', 'damski', 'uniwersalny'],
    },
    {
      key: 'description',
      type: 'string',
      label: 'Opis',
    },
    {
      key: 'createdAt',
      type: 'date',
      label: 'Data utworzenia',
      sortable: true,
      filterable: true,
    },
    {
      key: 'actions',
      type: 'actions',
      label: '',
    },
  ];

  if (isLoading) return <Loader />;
  if (error) toast.error('Błąd serwera. Spróbuj ponownie później.');

  return (
    <div>
      <h2>Lista elementów</h2>

      <DataTable<Item>
        data={data?.data}
        total={data?.meta.total || 0}
        columns={columns}
        query={query}
        onQueryChange={onQueryChange}
        isLoading={isLoading}
      />
    </div>
  );
}
