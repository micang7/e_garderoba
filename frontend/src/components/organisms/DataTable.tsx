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
  Modal,
} from 'react-bootstrap';
import Pagination from '../molecules/Pagination';
import { CriticalButton, GhostButton, SecondaryButton } from '../atoms/Button';
import SelectTextInput from '../atoms/SelectTextInput';
import DateRangeSubmit from '../molecules/DateRangeSubmit';
import { TableHeader } from '../atoms/table/TableHeader';
import { TableRow } from '../atoms/table/TableRow';
import { Table } from '../atoms/table/Table';
import { TableHead } from '../atoms/table/TableHead';
import { useNavigate } from 'react-router-dom';
import { useDeleteUser } from '../../api/hooks/query/user-hooks';
import { TableCell } from '../atoms/table/TableCell';
import { TableBody } from '../atoms/table/TableBody';
import { useAuth } from '../../auth/useAuth';

export interface DataTableColumn {
  key: string;
  type: 'string' | 'date' | 'enum' | 'number' | 'actions';
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  enumValues?: string[];
  onDelete?: (id: number) => void;
  href?: string;
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
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();

  const [deleteModalShow, setDeleteModalShow] = useState(false);

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
    <div>
      {/* SEARCH */}
      <TextInputSubmit
        value={query.search ?? ''}
        onSubmit={setSearch}
        placeholder="Wyszukaj..."
        clearButtonLabel="Wyczyść"
        submitButtonLabel="Zastosuj"
      />

      {/* TABLE */}
      <div style={{ margin: '20px 0', minHeight: '350px', overflow: 'auto' }}>
        <Table>
          <TableHead className="sticky-top">
            <TableRow>
              {columns.map((c) => (
                <TableHeader key={String(c.key)}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {c.label}

                    <div style={{ display: 'flex' }}>
                      {/* SORT */}
                      {c.sortable && (
                        <GhostButton
                          style={{
                            padding: '0.1em 0.2em',
                            marginLeft: '0.5em',
                          }}
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
                            style={{
                              padding: '0.1em 0.2em',
                              marginLeft: '0.5em',
                            }}
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
                                minWidth: '200px',
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
                                    onChange={(e) =>
                                      setFilter(c.key, e.target.value)
                                    }
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
                                  endDate={
                                    (query[`${c.key}To`] as string) ?? ''
                                  }
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
                  </div>
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
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
                          onClick={() => navigate(`/${c.href}/${row.id}`)}
                        >
                          <Settings size={18} />
                        </GhostButton>
                        {typeIsUser && row.id === authUser?.id ? (
                          <span style={{ letterSpacing: 1.2 }}>{` (Ty)`}</span>
                        ) : (
                          <>
                            <GhostButton
                              style={{ color: 'var(--bs-danger)' }}
                              onClick={() => setDeleteModalShow(true)}
                            >
                              <Trash size={18} />
                            </GhostButton>

                            <Modal
                              show={deleteModalShow}
                              onHide={() => setDeleteModalShow(false)}
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  Potwierdzenie usunięcia
                                </Modal.Title>
                              </Modal.Header>

                              <Modal.Body>
                                Czy na pewno chcesz usunąć ten rekord?
                              </Modal.Body>

                              <Modal.Footer>
                                <SecondaryButton
                                  onClick={() => setDeleteModalShow(false)}
                                >
                                  Anuluj
                                </SecondaryButton>
                                <CriticalButton
                                  onClick={() => {
                                    c.onDelete?.(row.id as number);
                                    setDeleteModalShow(false);
                                  }}
                                >
                                  Usuń
                                </CriticalButton>
                              </Modal.Footer>
                            </Modal>
                          </>
                        )}
                      </TableCell>
                    ) : (
                      <TableCell key={String(c.key)}>
                        {c.type === 'date'
                          ? new Date(row[c.key] as string).toLocaleDateString()
                          : String(row[c.key])}
                      </TableCell>
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
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <Pagination
        offset={query.offset}
        limit={query.limit}
        total={total}
        onOffsetChange={(offset) => onQueryChange({ ...query, offset })}
        onLimitChange={(limit) => onQueryChange({ ...query, limit, offset: 0 })}
      />
    </div>
  );
}
