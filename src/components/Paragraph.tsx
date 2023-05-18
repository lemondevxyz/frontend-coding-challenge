import styled from 'styled-components';

interface ParagraphProps {
  align?: string;
}

const Paragraph = styled.p<ParagraphProps>`
  text-align: ${(props) => props.align || 'left'};
`;

export default Paragraph;
