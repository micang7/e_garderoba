import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const DateInput = styled(FormControl).attrs({ type: 'date' })`
  minwidth: 200px;
`;

export default DateInput;
