import Page from './Page';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import {
  useDashboard,
  type DashboardStats,
} from '../api/hooks/query/event-hooks';

export default function Dashboard() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <Page>
        <h1>Witaj w systemie e-garderoba!</h1>
        <Spinner />
      </Page>
    );
  }

  const stats: DashboardStats = data?.data ?? {
    totalEvents: 0,
    eventsByType: { wypozyczenie: 0, zwrot: 0, zagubienie: 0 },
    uniqueUsers: 0,
    activeRentals: 0,
    mostPopularItem: { itemId: 0, itemCode: '', count: 0 },
    averageRentalDuration: '',
    eventsLast30Days: [],
  };

  return (
    <Page>
      <h1>Witaj w systemie e-garderoba!</h1>

      <Row className="mt-4" xs={1} md={2} lg={3} xl={4}>
        <Col className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Łączna liczba zdarzeń</Card.Title>
              <Card.Text>{stats.totalEvents}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Wypożyczenia</Card.Title>
              <Card.Text>{stats.eventsByType?.wypozyczenie}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Zwroty</Card.Title>
              <Card.Text>{stats.eventsByType?.zwrot}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Zagubienia</Card.Title>
              <Card.Text>{stats.eventsByType?.zagubienie}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Unikalni użytkownicy</Card.Title>
              <Card.Text>{stats.uniqueUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Aktywne wypożyczenia</Card.Title>
              <Card.Text>{stats.activeRentals}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Najpopularniejszy przedmiot</Card.Title>
              <Card.Text>
                ID: {stats.mostPopularItem?.itemId} <br />
                Liczba wypożyczeń: {stats.mostPopularItem?.count}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Średni czas wypożyczenia</Card.Title>
              <Card.Text>{stats.averageRentalDuration} dni</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="mt-5">Zdarzenia z ostatnich 30 dni</h3>
      <Row className="mt-3">
        {stats.eventsLast30Days?.map((d: any) => (
          <Col key={d.day} md={3} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{d.day}</Card.Title>
                <Card.Text>{d.count} zdarzeń</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Page>
  );
}
