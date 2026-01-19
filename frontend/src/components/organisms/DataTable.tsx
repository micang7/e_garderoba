import { useState } from 'react';
import {
  ArrowDownAZ,
  ArrowDownUp,
  ArrowDownZA,
  Funnel,
  Settings,
  Trash,
} from 'lucide-react';
import TextInputSubmit from '../molecules/TextInputSubmit';
import {
  CloseButton,
  Dropdown,
  DropdownItem,
  DropdownItemText,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import Pagination from '../molecules/Pagination';
import { GhostButton, SecondaryButton } from '../atoms/Button';
import SelectTextInput from '../atoms/SelectTextInput';
import DateRangeSubmit from '../molecules/DateRangeSubmit';
import { TableHeader } from '../atoms/table/TableHeader';
import { TableRow } from '../atoms/table/TableRow';
import { Table } from '../atoms/table/Table';
import { TableHead } from '../atoms/table/TableHead';
import { useNavigate } from 'react-router-dom';
import { useDeleteUser } from '../../hooks/user-hooks';
import { authStore } from '../../auth/auth-store';
import { TableCell } from '../atoms/table/TableCell';

export interface DataTableColumn {
  key: string;
  type: 'string' | 'date' | 'enum' | 'number' | 'actions';
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  enumValues?: string[];
  actions?: { element: unknown; callback: unknown }[];
}

export interface DataTableQuery {
  offset?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
  [field: string]: unknown;
}

export interface DataTableProps<T> {
  data?: T[];
  typeIsUser?: boolean;
  total: number;
  columns: DataTableColumn[];
  query: DataTableQuery;
  onQueryChange: (query: DataTableQuery) => void;
  isLoading: boolean;
}

export function DataTable<T extends { id: number }>({
  data,
  typeIsUser,
  total,
  columns,
  query,
  onQueryChange,
  isLoading,
}: DataTableProps<T>) {
  const authUser = authStore.getUser();
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();

  const [activeFilterColumn, setActiveFilterColumn] = useState('');

  const setSearch = (search: string) =>
    onQueryChange({
      search: search === '' ? undefined : search,
      offset: 0,
    });

  const setSortOrder = (field: string) => {
    let sort = query.sort;
    let order = query.order;

    if (field === query.sort) {
      if (order === undefined) {
        order = 'ASC';
      } else if (order === 'ASC') {
        order = 'DESC';
      } else {
        sort = undefined;
        order = undefined;
      }
    } else {
      sort = field;
      order = 'ASC';
    }
    onQueryChange({ sort, order });
  };

  const setFilter = (field: string, value?: string) => {
    onQueryChange({
      [field]: value === '' ? undefined : value,
      offset: 0,
    });
  };

  return (
    <>
      {/* SEARCH */}
      <TextInputSubmit
        value={query.search ?? ''}
        onSubmit={setSearch}
        placeholder="Wyszukaj..."
        clearButtonLabel="Wyczyść"
        submitButtonLabel="Zastosuj"
      />

      {/* TABLE */}
      <Table striped bordered hover>
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableHeader key={String(c.key)}>
                {c.label}

                <div style={{ display: 'flex' }}>
                  {/* SORT */}
                  {c.sortable && (
                    <GhostButton
                      style={{ padding: '0.1em 0.2em', marginLeft: '0.5em' }}
                      onClick={() => setSortOrder(String(c.key))}
                    >
                      {query.order === undefined || query.sort !== c.key ? (
                        <ArrowDownUp size={18} />
                      ) : query.order === 'ASC' ? (
                        <ArrowDownAZ size={18} />
                      ) : (
                        <ArrowDownZA size={18} />
                      )}
                    </GhostButton>
                  )}

                  {/* FILTER */}
                  {c.filterable && (
                    <Dropdown
                      show={activeFilterColumn === String(c.key)}
                      align="end"
                      onToggle={() =>
                        setActiveFilterColumn(
                          activeFilterColumn === String(c.key)
                            ? ''
                            : String(c.key),
                        )
                      }
                    >
                      <DropdownToggle
                        as={GhostButton}
                        style={{ padding: '0.1em 0.2em', marginLeft: '0.5em' }}
                        id={`filter-toggle-${String(c.key)}`}
                      >
                        <Funnel size={18} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingRight: '0.5em',
                          }}
                        >
                          <DropdownItemText>Filtruj</DropdownItemText>
                          <CloseButton
                            onClick={() => setActiveFilterColumn('')}
                          />
                        </div>
                        {c.type === 'enum' ? (
                          <DropdownItem>
                            <div
                              style={{
                                display: 'grid',
                                gap: '0.5em',
                              }}
                            >
                              <SelectTextInput
                                options={c.enumValues ?? []}
                                value={query[c.key] as string}
                                onChange={(value) => setFilter(c.key, value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <SecondaryButton
                                onClick={() => setFilter(c.key, undefined)}
                              >
                                Wyczyść
                              </SecondaryButton>
                            </div>
                          </DropdownItem>
                        ) : c.type === 'string' ? (
                          <DropdownItem>
                            <TextInputSubmit
                              value={(query[c.key] as string) ?? ''}
                              onSubmit={(value) => setFilter(c.key, value)}
                              onClick={(e: React.FormEvent) =>
                                e.stopPropagation()
                              }
                              clearButtonLabel="Wyczyść"
                              submitButtonLabel="Zastosuj"
                            />
                          </DropdownItem>
                        ) : c.type === 'date' ? (
                          <DropdownItem>
                            <DateRangeSubmit
                              startDate={
                                (query[`${c.key}From`] as string) ?? ''
                              }
                              endDate={(query[`${c.key}To`] as string) ?? ''}
                              onSubmit={(startDate, endDate) => {
                                setFilter(`${c.key}From`, startDate);
                                setFilter(`${c.key}To`, endDate);
                              }}
                              clearButtonText="Wyczyść"
                              submitButtonText="Zastosuj"
                              onClick={(e: React.FormEvent) =>
                                e.stopPropagation()
                              }
                            />
                          </DropdownItem>
                        ) : null}
                      </DropdownMenu>
                    </Dropdown>
                  )}
                </div>
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {!isLoading && data?.length ? (
            data?.map((row: { [key: string]: unknown; id: number }) => (
              <TableRow key={row.id}>
                {columns.map((c) =>
                  c.type === 'actions' ? (
                    <TableCell
                      key={String(c.key)}
                      style={{ display: 'flex', gap: '0.5em' }}
                    >
                      <GhostButton
                        style={{ color: 'var(--bs-primary)' }}
                        onClick={() => navigate(`/users/${row.id}`)}
                      >
                        <Settings size={18} />
                      </GhostButton>
                      {typeIsUser && row.id === authUser.id ? (
                        <span style={{ letterSpacing: 1.2 }}>{` (Ty)`}</span>
                      ) : (
                        <GhostButton
                          style={{ color: 'var(--bs-danger)' }}
                          onClick={() => deleteUser.mutate(row.id as number)}
                        >
                          <Trash size={18} />
                        </GhostButton>
                      )}
                    </TableCell>
                  ) : (
                    <td key={String(c.key)}>{String(row[c.key])}</td>
                  ),
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                style={{ textAlign: 'center' }}
              >
                Brak wyników
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      {/* PAGINATION */}
      <Pagination
        offset={query.offset}
        limit={query.limit}
        total={total}
        onOffsetChange={(offset) => onQueryChange({ ...query, offset })}
        onLimitChange={(limit) => onQueryChange({ ...query, limit, offset: 0 })}
      />
    </>
  );
}
