import styled from 'styled-components';

export const TableHeader = styled.th`
  text-align: left;
  padding: 8px 10px;
  font-weight: 600;
  border-bottom: 1px solid #ddd;

  border-right: 1px solid #ddd;
  &:last-child {
    border-right: none;
  }
`;
