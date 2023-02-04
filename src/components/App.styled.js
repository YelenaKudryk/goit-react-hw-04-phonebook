import styled from '@emotion/styled';

export const Section = styled.div`
  width: 400px;
  margin-right: auto;
  margin-left: auto;
  margin-top: ${p => p.theme.spacing(4)};
  margin-bottom: ${p => p.theme.spacing(4)};
  padding: ${p => p.theme.spacing(4)};
  background-color: ${p => p.theme.colors.backgroundSection};
`;

export const PageTitle = styled.h2`
  text-align: center;
  margin-bottom: ${p => p.theme.spacing(4)};
`;

export const Text = styled.p`
  text-align: center;
`;
