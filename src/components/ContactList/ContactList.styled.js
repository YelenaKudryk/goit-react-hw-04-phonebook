import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(3)};
  color: ${p => p.theme.colors.secondaryText};
`;
