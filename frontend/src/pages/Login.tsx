import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/atoms/Button';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import TextInputLabeled from '../components/molecules/TextInputLabeled';
import useAuthApi from '../api/hooks/service/useAuthApi';
import { useAuth } from '../auth/useAuth';

const Login = () => {
  const { isAuth } = useAuth();
  const AuthApi = useAuthApi();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await AuthApi.login({ email, password });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

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
                required
              />
              <TextInputLabeled
                id="password"
                type="password"
                placeholder="Wpisz hasło"
                label="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
