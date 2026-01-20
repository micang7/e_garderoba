import type { ReactNode } from 'react';
import { Container, Row, Col, Nav, Dropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Avatar } from '../atoms/Avatar';
import { LogOut, User } from 'lucide-react';

export interface SideNavOption {
  name: string;
  link: string;
}

interface LayoutProps {
  sidenavOptions: SideNavOption[];
  children: ReactNode;
}

export default function Layout({ sidenavOptions, children }: LayoutProps) {
  const { user, clear } = useAuth();
  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const email = user?.email ?? '';
  const navigate = useNavigate();

  const initials =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* SIDENAV */}
        <Col
          xs={12}
          md={3}
          lg={2}
          className="d-flex flex-column border-end bg-light p-0"
        >
          <Nav className="flex-column p-1 gap-1">
            {sidenavOptions.map((option) => (
              <Nav.Link key={option.link} as={NavLink} to={option.link}>
                {option.name}
              </Nav.Link>
            ))}
          </Nav>

          {/* USER INFO */}
          <div className="mt-auto p-2 border-top d-flex align-items-center gap-2 position-relative">
            <Avatar initials={initials} />

            <div className="flex-grow-1 small overflow-hidden">
              <div className="fw-semibold text-truncate">
                {firstName} {lastName}
              </div>
              <div className="text-muted text-truncate">{email}</div>
            </div>

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                className="p-1 text-muted shadow-none"
              ></Dropdown.Toggle>

              <Dropdown.Menu className="shadow-sm" style={{ minWidth: 180 }}>
                <Dropdown.Item onClick={() => navigate(`/users/${user?.id}`)}>
                  <User size={16} className="me-2" />
                  Mój profil
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item onClick={clear} className="text-danger">
                  <LogOut size={16} className="me-2" />
                  Wyloguj
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>

        {/* MAIN CONTENT */}
        <Col className="p-3 h-100 overflow-auto">{children}</Col>
      </Row>
    </Container>
  );
}
