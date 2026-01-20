import { Col, Container, Form, Row } from 'react-bootstrap';
import Page from '../Page';
import TextInputLabeled from '../../components/molecules/TextInputLabeled';
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Button';
import SelectTextInputLabeled from '../../components/molecules/SelectTextInputLabeled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useItem, useUpdateItem } from '../../api/hooks/query/item-hooks';
import type { UpdateItemDto } from '../../api/interfaces/item-interfaces';

export default function ItemDetails() {
  const id = Number(useParams().id);
  const { data } = useItem(id);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<UpdateItemDto>({
    code: '',
    name: '',
    size: '',
    gender: 'męski',
    description: '',
  });

  const { updateItem, fieldErrors } = useUpdateItem(id);

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
    updateItem(form);
    setIsEditing(false);
  };

  return (
    <Page>
      <h1>Dane elementu</h1>
      <Container style={{ marginTop: '2rem', display: 'flex' }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <TextInputLabeled
                id="code"
                label="Kod"
                value={(isEditing ? form.code : data?.data.code) ?? ''}
                onChange={handleChange}
                errorMessage={fieldErrors.code}
                disabled={!isEditing}
              />
            </Col>
            <Col>
              <TextInputLabeled
                id="name"
                label="Nazwa"
                value={(isEditing ? form.name : data?.data.name) ?? ''}
                onChange={handleChange}
                errorMessage={fieldErrors.name}
                disabled={!isEditing}
              />
            </Col>
          </Row>
          <Row>
            <TextInputLabeled
              id="size"
              label="Rozmiar"
              value={(isEditing ? form.size : data?.data.size) ?? ''}
              onChange={handleChange}
              errorMessage={fieldErrors.size}
              disabled={!isEditing}
            />
          </Row>
          <Row>
            <SelectTextInputLabeled
              label="Płeć"
              value={(isEditing ? form.gender : data?.data.gender) ?? ''}
              options={['męski', 'damski', 'uniwersalny']}
              onChange={handleChange}
              errorMessage={fieldErrors.gender}
              disabled={!isEditing}
            />
          </Row>
          <Row>
            <TextInputLabeled
              id="description"
              label="Opis"
              value={
                (isEditing ? form.description : data?.data.description) ?? ''
              }
              onChange={handleChange}
              required={false}
              errorMessage={fieldErrors.description}
              disabled={!isEditing}
            />
          </Row>
          {isEditing ? (
            <div style={{ display: 'flex', gap: '20px' }}>
              <SecondaryButton onClick={() => setIsEditing(false)}>
                Anuluj
              </SecondaryButton>
              <PrimaryButton type="submit">Zapisz</PrimaryButton>
            </div>
          ) : (
            <PrimaryButton
              onClick={() => {
                setIsEditing(true);
                setForm({
                  code: data?.data.code ?? '',
                  name: data?.data.name ?? '',
                  size: data?.data.size ?? '',
                  gender: data?.data.gender ?? 'męski',
                  description: data?.data.description ?? '',
                });
              }}
            >
              Edytuj element
            </PrimaryButton>
          )}
        </Form>
      </Container>
    </Page>
  );
}
