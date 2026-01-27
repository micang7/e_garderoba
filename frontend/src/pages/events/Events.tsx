import { useState } from 'react';
import {
  DataTable,
  type DataTableColumn,
  type DataTableQuery,
} from '../../components/organisms/DataTable';
import { useDeleteEvent, useEvents } from '../../api/hooks/query/event-hooks';
import Loader from '../../components/atoms/Spinner';
import { toast } from 'sonner';
import Page from '../Page';
import { PrimaryButton } from '../../components/atoms/Button';
import type { Event } from '../../api/interfaces/event-interfaces';

export default function EventsPage() {
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

  const { data, isLoading, error } = useEvents(query);
  const deleteEvent = useDeleteEvent();

  const columns: DataTableColumn[] = [
    {
      key: 'type',
      type: 'enum',
      enumValues: ['wypożyczenie', 'zagubienie', 'zwrot'],
      label: 'Typ',
      sortable: true,
      filterable: true,
    },
    {
      key: 'userName',
      type: 'string',
      label: 'Użytkownik',
    },
    {
      key: 'approverName',
      type: 'string',
      label: 'Zatwierdzający',
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
      href: 'events',
      onDelete: deleteEvent.mutate,
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
        <h2>Zdarzenia</h2>
        <PrimaryButton href="/events/create">Dodaj zdarzenie</PrimaryButton>
      </div>

      <DataTable<Event>
        data={data?.data}
        total={data?.meta.total || 0}
        columns={columns}
        query={query}
        onQueryChange={onQueryChange}
        isLoading={isLoading}
      />
    </Page>
  );
}
