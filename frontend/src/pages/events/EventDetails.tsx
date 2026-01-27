import { useParams } from 'react-router-dom';
import { useEvent } from '../../api/hooks/query/event-hooks';
import Page from '../Page';
import { Col, Container, Row } from 'react-bootstrap';
import type {
  EventDetails,
  Loss,
  Rental,
  Return,
} from '../../api/interfaces/event-interfaces';

export default function EventDetails() {
  const id = Number(useParams().id);
  const { data } = useEvent(id);

  const event = data?.data as EventDetails;

  return (
    <Page>
      <h1>Szczegóły zdarzenia</h1>

      <Container style={{ marginTop: '2rem' }}>
        <Row className="mb-3">
          <Col md={3}>
            <strong>ID</strong>
          </Col>
          <Col>{event?.id}</Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <strong>Typ zdarzenia</strong>
          </Col>
          <Col>{event?.type}</Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <strong>Użytkownik</strong>
          </Col>
          <Col>
            {event?.user.firstName} {event?.user.lastName} <br />
            <small>{event?.user.email}</small>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <strong>Zatwierdził</strong>
          </Col>
          <Col>
            {event?.approver.firstName} {event?.approver.lastName} <br />
            <small>{event?.approver.email}</small>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <strong>Elementy</strong>
          </Col>
          <Col>
            {event && event.eventItems.length > 0 ? (
              <>
                <ul>
                  {event.eventItems.map((ei, index) => (
                    <li key={index}>
                      <b>{ei.item.name}</b> {ei.item.code}
                      <br />
                      {event.type === 'wypożyczenie' ? (
                        <>
                          Cel: {(ei.details as Rental).purposeType}
                          <br />
                          Opis: {(ei.details as Rental).purposeDescription}
                          <br />
                          Planowana data zwrotu:{' '}
                          {new Date(
                            (ei.details as Rental).plannedReturnDate,
                          ).toLocaleDateString()}
                        </>
                      ) : event.type === 'zagubienie' ? (
                        <>Opis: {(ei.details as Loss).description}</>
                      ) : (
                        <>
                          Status: {(ei.details as Return).status}
                          <br />
                          Opis: {(ei.details as Return).description}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              '-'
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <strong>Data utworzenia</strong>
          </Col>
          <Col>{new Date(event?.createdAt ?? 0).toLocaleString('pl-PL')}</Col>
        </Row>
      </Container>
    </Page>
  );
}
