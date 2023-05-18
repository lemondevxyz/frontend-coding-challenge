import React from 'react';
import Flex from './Flex';
import TournamentSingle from './TournamentSingle';
import TournamentError from './TournamentError';
import type { Tournament } from '../actions/tournaments';
import type { TournamentState } from '../reducers/tournaments';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Paragraph from './Paragraph';
import theme from '../theme';

const CenterParagraph = styled(Paragraph)`
  margin: 0 auto;
`;
const Container = styled(Flex)`
  padding-top: ${theme.spacing(6)};
`;

export default function TournamentBody() {
  const { data, loading, error } = useSelector(
    (state: { tournaments: TournamentState }) => state.tournaments
  );

  return (
    <Container wrap="wrap">
      {loading && <CenterParagraph>Loading tournaments....</CenterParagraph>}
      {!loading && error && <TournamentError />}
      {!loading &&
        !error &&
        data.map((v: Tournament, i: number) => (
          <TournamentSingle {...v} key={i} />
        ))}
    </Container>
  );
}
