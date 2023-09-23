import { styled } from 'styled-components';

export const BasicPadding = ({ children }: { children: React.ReactNode }) => {
  return <PaddingContainer>{children}</PaddingContainer>;
};

const PaddingContainer = styled.div`
  padding: 0 120px;
`;
