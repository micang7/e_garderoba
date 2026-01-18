import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const TextInput = styled(FormControl).attrs({ type: 'text' })`
  min-width: 200px;
`;

export default TextInput;
