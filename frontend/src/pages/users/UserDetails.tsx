import { Col, Container, Form, Row } from 'react-bootstrap';
import Page from '../Page';
import type { UpdateUserDto } from '../../api/interfaces/user-interfaces';
import TextInputLabeled from '../../components/molecules/TextInputLabeled';
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Button';
import SelectTextInputLabeled from '../../components/molecules/SelectTextInputLabeled';
import { useUpdateUser, useUser } from '../../api/hooks/query/user-hooks';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserDetails() {
  const id = Number(useParams().id);
  const { data } = useUser(id);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<UpdateUserDto>({
    firstName: '',
    lastName: '',
    email: '',
    phone: undefined,
    role: 'tancerz',
  });

  const { updateUser, fieldErrors } = useUpdateUser(id);

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
    updateUser(form);
    setIsEditing(false);
  };

  return (
    <Page>
      <h1>Dane użytkownika</h1>
      <Container style={{ marginTop: '2rem', display: 'flex' }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <TextInputLabeled
                id="firstName"
                label="Imię"
                value={
                  (isEditing ? form.firstName : data?.data.firstName) ?? ''
                }
                onChange={handleChange}
                errorMessage={fieldErrors.firstName}
                disabled={!isEditing}
              />
            </Col>
            <Col>
              <TextInputLabeled
                id="lastName"
                label="Nazwisko"
                value={(isEditing ? form.lastName : data?.data.lastName) ?? ''}
                onChange={handleChange}
                errorMessage={fieldErrors.lastName}
                disabled={!isEditing}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInputLabeled
                id="email"
                label="Email"
                type="email"
                value={(isEditing ? form.email : data?.data.email) ?? ''}
                onChange={handleChange}
                errorMessage={fieldErrors.email}
                disabled={!isEditing}
              />
            </Col>
            <Col>
              <TextInputLabeled
                id="phone"
                label="Telefon"
                value={(isEditing ? form.phone : data?.data.phone) ?? ''}
                onChange={handleChange}
                required={false}
                errorMessage={fieldErrors.phone}
                disabled={!isEditing}
              />
            </Col>
          </Row>
          <Row>
            <SelectTextInputLabeled
              label="Rola"
              value={(isEditing ? form.role : data?.data.role) ?? ''}
              options={['tancerz', 'kierownik', 'administrator']}
              onChange={handleChange}
              errorMessage={fieldErrors.role}
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
                  firstName: data?.data.firstName ?? '',
                  lastName: data?.data.lastName ?? '',
                  email: data?.data.email ?? '',
                  phone: data?.data.phone ?? undefined,
                  role: data?.data.role ?? 'tancerz',
                });
              }}
            >
              Edytuj użytkownika
            </PrimaryButton>
          )}
        </Form>
      </Container>
    </Page>
  );
}
