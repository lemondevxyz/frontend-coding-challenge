import styled from 'styled-components';

interface FlexProps {
  justify?: string;
  wrap?: string;
  direction?: string;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${(props) => props.justify || 'inherit'};
  flex-wrap: ${(props) => props.wrap || 'inherit'};
  flex-direction: ${(props) => props.direction || 'inherit'};
`;

export default Flex;
