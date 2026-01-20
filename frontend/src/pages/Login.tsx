import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/atoms/Button';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import TextInputLabeled from '../components/molecules/TextInputLabeled';
import useAuthApi from '../api/hooks/service/useAuthApi';
import { useAuth } from '../auth/useAuth';
import { toast } from 'sonner';
import type { ValidationError } from '../api/interfaces/error-interfaces';
import { ValidationErrorMessage } from '../validation/validation-errors';

const Login = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  const AuthApi = useAuthApi();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setErrors({});

    await AuthApi.login({ email, password })
      .then(() => {
        navigate('/');

        setEmail('');
        setPassword('');
      })
      .catch(({ status, data }) => {
        switch (status) {
          case 400:
            setErrors((prev) => ({
              ...prev,
              ...data.validationErrors.reduce(
                (errors: Record<string, string>, err: ValidationError) => {
                  errors[err.field] = ValidationErrorMessage[err.code];
                  return errors;
                },
                {},
              ),
            }));
            break;
          case 401:
            setErrors((prev) => ({
              ...prev,
              common: 'Niepoprawny email lub hasło.',
            }));
            break;
          default:
            toast.error('Bład serwera. Spróbuj ponownie później');
            break;
        }
      });
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={5} lg={4}>
          <Card className="shadow-sm p-4">
            <h2 className="text-center mb-4">Logowanie</h2>
            <Form onSubmit={handleLogin}>
              <TextInputLabeled
                id="email"
                type="email"
                placeholder="Wpisz email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors.email}
              />
              <TextInputLabeled
                id="password"
                type="password"
                placeholder="Wpisz hasło"
                label="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={errors.password}
              />
              {errors.common && (
                <p className="text-danger mb-3">{errors.common}</p>
              )}
              <PrimaryButton type="submit" className="w-100 mt-3">
                Zaloguj się
              </PrimaryButton>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
