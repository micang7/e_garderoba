import { Col, Container, Form, Row } from 'react-bootstrap';
import Page from '../Page';
import type { CreateUserDto } from '../../api/interfaces/user-interfaces';
import TextInputLabeled from '../../components/molecules/TextInputLabeled';
import { PrimaryButton } from '../../components/atoms/Button';
import SelectTextInputLabeled from '../../components/molecules/SelectTextInputLabeled';
import { useCreateUser } from '../../api/hooks/query/user-hooks';
import { useState } from 'react';

export default function CreateUser() {
  const [form, setForm] = useState<CreateUserDto>({
    firstName: '',
    lastName: '',
    email: '',
    phone: undefined,
    role: 'tancerz',
    password: '',
  });

  const { createUser, fieldErrors } = useCreateUser({
    onSuccess: () => {
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: undefined,
        role: 'tancerz',
        password: '',
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
    createUser(form);
  };

  return (
    <Page>
      <h1>Utwórz użytkownika</h1>
      <Container style={{ marginTop: '2rem', display: 'flex' }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <TextInputLabeled
                id="firstName"
                label="Imię"
                value={form.firstName}
                onChange={handleChange}
                errorMessage={fieldErrors.firstName}
              />
            </Col>
            <Col>
              <TextInputLabeled
                id="lastName"
                label="Nazwisko"
                value={form.lastName}
                onChange={handleChange}
                errorMessage={fieldErrors.lastName}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInputLabeled
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                errorMessage={fieldErrors.email}
              />
            </Col>
            <Col>
              <TextInputLabeled
                id="phone"
                label="Telefon"
                value={form.phone ?? ''}
                onChange={handleChange}
                required={false}
                errorMessage={fieldErrors.phone}
              />
            </Col>
          </Row>
          <Row>
            <SelectTextInputLabeled
              label="Rola"
              value={form.role}
              options={['tancerz', 'kierownik', 'administrator']}
              onChange={handleChange}
              errorMessage={fieldErrors.role}
            />
          </Row>
          <Row>
            <TextInputLabeled
              id="password"
              label="Hasło"
              type="password"
              value={form.password}
              onChange={handleChange}
              errorMessage={fieldErrors.password}
            />
          </Row>
          <PrimaryButton type="submit">Dodaj użytkownika</PrimaryButton>
        </Form>
      </Container>
    </Page>
  );
}
