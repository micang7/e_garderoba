import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'transparent',
    }}
  >
    <Spinner animation="border" />
  </div>
);

export default Loader;
