import { useState } from 'react';
import {
  DataTable,
  type DataTableQuery,
  type DataTableColumn,
} from '../../components/organisms/DataTable';
import type { User } from '../../api/interfaces/user-interfaces';
import Loader from '../../components/atoms/Spinner';
import { toast } from 'sonner';
import { useUsers } from '../../api/hooks/query/user-hooks';
import Page from '../Page';

export default function UsersPage() {
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

  const { data, isLoading, error } = useUsers(query);

  const columns: DataTableColumn[] = [
    {
      key: 'firstName',
      type: 'string',
      label: 'Imię',
      filterable: true,
    },
    {
      key: 'lastName',
      type: 'string',
      label: 'Nazwisko',
      sortable: true,
      filterable: true,
    },
    {
      key: 'email',
      type: 'string',
      label: 'Email',
      filterable: true,
    },
    {
      key: 'role',
      type: 'enum',
      label: 'Rola',
      sortable: true,
      filterable: true,
      enumValues: ['administrator', 'kierownik', 'tancerz'],
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
    <Page>
      <h2 style={{ marginBottom: '30px' }}>Użytkownicy</h2>

      <DataTable<User>
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
