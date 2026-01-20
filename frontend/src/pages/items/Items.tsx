import { useState } from 'react';
import {
  DataTable,
  type DataTableQuery,
  type DataTableColumn,
} from '../../components/organisms/DataTable';
import Loader from '../../components/atoms/Spinner';
import { toast } from 'sonner';
import Page from '../Page';
import { PrimaryButton } from '../../components/atoms/Button';
import { useDeleteItem, useItems } from '../../api/hooks/query/item-hooks';
import type { Item } from '../../api/interfaces/item-interfaces';

export default function ItemsPage() {
  const [query, setQuery] = useState({
    offset: 0,
    limit: 10,
  });
  const onQueryChange = (newQuery: DataTableQuery) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      ...newQuery,
    }));
  };

  const { data, isLoading, error } = useItems(query);
  const deleteItem = useDeleteItem();

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
      href: 'items',
      onDelete: deleteItem.mutate,
    },
  ];

  if (isLoading) return <Loader />;
  if (error) toast.error('Błąd serwera. Spróbuj ponownie później.');

  return (
    <Page>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <h2>Elementy</h2>
        <PrimaryButton href="/users/create">Dodaj element</PrimaryButton>
      </div>

      <DataTable<Item>
        data={data?.data}
        typeIsUser
        total={data?.meta.total || 0}
        columns={columns}
        query={query}
        onQueryChange={onQueryChange}
        isLoading={isLoading}
      />
    </Page>
  );
}
