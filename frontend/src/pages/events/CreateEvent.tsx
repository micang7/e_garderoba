import { useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import Page from '../Page';
import TextInputLabeled from '../../components/molecules/TextInputLabeled';
import SelectTextInputLabeled from '../../components/molecules/SelectTextInputLabeled';
import { PrimaryButton } from '../../components/atoms/Button';

import { useUsers } from '../../api/hooks/query/user-hooks';
import { useItems } from '../../api/hooks/query/item-hooks';

import {
  useCreateRental,
  useCreateLoss,
  useCreateReturn,
} from '../../api/hooks/query/event-hooks';

import type {
  CreateRentalDto,
  CreateLossDto,
  CreateReturnDto,
} from '../../api/interfaces/event-interfaces';
import { useAuth } from '../../auth/useAuth';

export default function CreateEvent() {
  const { user } = useAuth();
  const { data: users } = useUsers({});
  const { data: items } = useItems({});

  const [form, setForm] = useState({
    type: 'wypożyczenie',
    userId: undefined as number | undefined,
    approvedBy: undefined as number | undefined,
    itemIds: [] as any[],
    purposeType: 'występ zespołu',
    purposeDescription: '',
    plannedReturnDate: '',
    lossDescription: '',
    status: 'bez uszkodzeń',
    returnDescription: '',
  });

  const { createRental } = useCreateRental({
    onSuccess: () => resetForm(),
  });

  const { createLoss } = useCreateLoss({
    onSuccess: () => resetForm(),
  });

  const { createReturn } = useCreateReturn({
    onSuccess: () => resetForm(),
  });

  function resetForm() {
    setForm({
      type: 'wypożyczenie',
      userId: undefined,
      approvedBy: undefined,
      itemIds: [],
      purposeType: 'występ zespołu',
      purposeDescription: '',
      plannedReturnDate: '',
      lossDescription: '',
      status: 'bez uszkodzeń',
      returnDescription: '',
    });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        value === ''
          ? undefined
          : ['userId', 'approvedBy'].includes(name)
            ? Number(value)
            : value,
    });
  };

  const handleItemsChange = (e: any) => {
    setForm({
      ...form,
      itemIds: Array.from(e.target.selectedOptions, (opt: { value: number }) =>
        Number(opt.value),
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (form.type) {
      case 'wypożyczenie':
        await createRental({
          userId: form.userId,
          approvedBy: Number(user?.id),
          itemIds: form.itemIds,
          ...(form.purposeType && { purposeType: form.purposeType }),
          ...(form.purposeDescription && {
            purposeDescription: form.purposeDescription,
          }),
          plannedReturnDate: form.plannedReturnDate,
        } as CreateRentalDto);
        break;

      case 'zagubienie':
        await createLoss({
          userId: form.userId,
          approvedBy: Number(user?.id),
          itemIds: form.itemIds,
          ...(form.lossDescription && { description: form.lossDescription }),
        } as CreateLossDto);
        break;

      case 'zwrot':
        await createReturn({
          userId: form.userId,
          approvedBy: Number(user?.id),
          itemIds: form.itemIds,
          status: form.status,
          ...(form.returnDescription && {
            description: form.returnDescription,
          }),
        } as CreateReturnDto);
        break;
    }
  };

  return (
    <Page>
      <h1>Utwórz zdarzenie</h1>
      <Container style={{ marginTop: '2rem', display: 'flex' }}>
        <Form onSubmit={handleSubmit}>
          <Row style={{ marginBottom: '15px' }}>
            <SelectTextInputLabeled
              label="Typ"
              name="type"
              value={form.type}
              options={['wypożyczenie', 'zagubienie', 'zwrot']}
              onChange={handleChange}
            />
          </Row>

          <Row style={{ marginBottom: '15px' }}>
            <Col>
              <Form.Label>Użytkownik</Form.Label>
              <Form.Select
                name="userId"
                value={form.userId ?? ''}
                onChange={handleChange}
                required
              >
                <option value="">— wybierz użytkownika —</option>
                {users?.data.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.email}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row style={{ marginBottom: '15px' }}>
            <Col>
              <Form.Label>Przedmioty</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={form.itemIds}
                onChange={handleItemsChange}
              >
                {items?.data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.code} ({item.name})
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>

          {form.type === 'wypożyczenie' && (
            <>
              <Row style={{ marginBottom: '15px' }}>
                <SelectTextInputLabeled
                  label="Cel wypożyczenia"
                  value={form.purposeType ?? ''}
                  options={[
                    'występ zespołu',
                    'sesja zdjęciowa zespołu',
                    'naprawa we własnym zakresie',
                    'inny',
                  ]}
                  onChange={handleChange}
                  required={false}
                />
              </Row>
              <Row style={{ marginBottom: '15px' }}>
                <TextInputLabeled
                  id="purposeDescription"
                  label="Opis celu"
                  name="purposeDescription"
                  value={form.purposeDescription ?? ''}
                  onChange={handleChange}
                  required={false}
                />
              </Row>
              <Row style={{ marginBottom: '15px' }}>
                <TextInputLabeled
                  id="plannedReturnDate"
                  label="Planowana data zwrotu"
                  name="plannedReturnDate"
                  type="date"
                  value={form.plannedReturnDate ?? ''}
                  onChange={handleChange}
                />
              </Row>
            </>
          )}

          {form.type === 'zagubienie' && (
            <Row style={{ marginBottom: '15px' }}>
              <TextInputLabeled
                id="lossDescription"
                label="Opis"
                name="lossDescription"
                value={form.lossDescription ?? ''}
                onChange={handleChange}
                required={false}
              />
            </Row>
          )}

          {form.type === 'zwrot' && (
            <>
              <Row style={{ marginBottom: '15px' }}>
                <SelectTextInputLabeled
                  label="Status"
                  value={form.status ?? ''}
                  options={['bez uszkodzeń', 'uszkodzony', 'zniszczony']}
                  onChange={handleChange}
                />
              </Row>
              <Row style={{ marginBottom: '15px' }}>
                <TextInputLabeled
                  id="returnDescription"
                  label="Opis zwrotu"
                  name="returnDescription"
                  value={form.returnDescription ?? ''}
                  onChange={handleChange}
                  required={false}
                />
              </Row>
            </>
          )}

          <PrimaryButton type="submit">Utwórz zdarzenie</PrimaryButton>
        </Form>
      </Container>
    </Page>
  );
}
