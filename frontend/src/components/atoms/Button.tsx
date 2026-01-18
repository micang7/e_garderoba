import { Button as BsButton } from 'react-bootstrap';
import styled from 'styled-components';

const Button = styled(BsButton)`
  text-align: center;
`;

const PrimaryButton = styled(Button).attrs({ variant: 'primary' })``;
const SecondaryButton = styled(Button).attrs({
  variant: 'outline-secondary',
})``;
const CriticalButton = styled(Button).attrs({ variant: 'danger' })``;
const GhostButton = styled(Button).attrs({ variant: 'light' })``;

export { Button, PrimaryButton, SecondaryButton, CriticalButton, GhostButton };
export default Button;
