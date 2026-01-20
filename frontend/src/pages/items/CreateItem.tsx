import { Col, Container, Form, Row } from 'react-bootstrap';
import Page from '../Page';
import TextInputLabeled from '../../components/molecules/TextInputLabeled';
import { PrimaryButton } from '../../components/atoms/Button';
import SelectTextInputLabeled from '../../components/molecules/SelectTextInputLabeled';
import { useState } from 'react';
import type { CreateItemDto } from '../../api/interfaces/item-interfaces';
import { useCreateItem } from '../../api/hooks/query/item-hooks';

export default function CreateItem() {
  const [form, setForm] = useState<CreateItemDto>({
    code: '',
    name: '',
    size: '',
    gender: 'męski',
    description: '',
  });

  const { createItem, fieldErrors } = useCreateItem({
    onSuccess: () => {
      setForm({
        code: '',
        name: '',
        size: '',
        gender: 'męski',
        description: '',
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value === '' ? undefined : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createItem(form);
  };

  return (
    <Page>
      <h1>Utwórz element</h1>
      <Container style={{ marginTop: '2rem', display: 'flex' }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <TextInputLabeled
                id="code"
                label="Kod"
                value={form.code}
                onChange={handleChange}
                errorMessage={fieldErrors.code}
              />
            </Col>
            <Col>
              <TextInputLabeled
                id="name"
                label="Nazwa"
                value={form.name}
                onChange={handleChange}
                errorMessage={fieldErrors.name}
              />
            </Col>
          </Row>
          <Row>
            <TextInputLabeled
              id="size"
              label="Rozmiar"
              value={form.size ?? ''}
              onChange={handleChange}
              errorMessage={fieldErrors.size}
            />
          </Row>
          <Row>
            <SelectTextInputLabeled
              label="Płeć"
              value={form.gender ?? 'męski'}
              options={['męski', 'damski', 'uniwersalny']}
              onChange={handleChange}
              errorMessage={fieldErrors.gender}
            />
          </Row>
          <Row>
            <TextInputLabeled
              id="description"
              label="Opis"
              value={form.description ?? ''}
              onChange={handleChange}
              required={false}
              errorMessage={fieldErrors.description}
            />
          </Row>
          <PrimaryButton type="submit">Dodaj użytkownika</PrimaryButton>
        </Form>
      </Container>
    </Page>
  );
}
