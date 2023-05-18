import React from 'react';
import Paragraph from './Paragraph';
import Button from './Button';
import Flex from './Flex';
import styled from 'styled-components';
import theme from '../theme';
import type { Tournament } from '../actions/tournaments';
import { useDispatch } from 'react-redux';
import H6 from './H6';
console.log('sa');
const SpacerDiv = styled.div`
  width: 33.3%;
  @media screen and (max-width: ${theme.breakpoints.m}) {
    width: 50%;
  }

  @media screen and (max-width: ${theme.breakpoints.s}) {
    width: 100%;
  }
`;

const ContainerDiv = styled.div`
  background-color: ${theme.palette.background.base};
  padding: ${theme.spacing(6)};
  margin: ${theme.spacing(6)};
`;

function padNum(v: number): string {
  return String(v).padStart(2, '0');
}

function formatDate(v: Date) {
  const [h, m, s] = [
    padNum(v.getHours()),
    padNum(v.getMinutes()),
    padNum(v.getSeconds()),
  ];
  const [yy, mm, dd] = [
    v.getFullYear(),
    padNum(v.getMonth() + 1),
    padNum(v.getDate()),
  ];

  return `${dd}/${mm}/${yy} ${h}:${m}:${s}`;
}

const RightButton = styled(Button)`
  margin-left: 8px;
`;

const nameRegex = /^[a-zA-Z0-9 ]+$/;
export function promptGetName(
  p: string = 'Enter tournament name'
): string | null {
  let n = prompt(p);
  if (n && nameRegex.test(n) && n.trim().length > 0) return n;

  return null;
}

export default function TournamentSingle(t: Tournament) {
  const epoch = Date.parse(t.startDate);
  const dispatch = useDispatch();
  const edit = () => {
    const n = promptGetName("Enter the tournament's new name");
    if (n)
      dispatch({
        type: 'EDIT_TOURNAMENT',
        payload: { id: t.id, name: n },
        asyncDispatch: dispatch,
      });
  };

  return (
    <SpacerDiv>
      <ContainerDiv>
        <H6>{t.name}</H6>
        <Paragraph>
          Organizer: {t.organizer}
          <br />
          Game: {t.game}
          <br />
          Date: {formatDate(new Date(epoch))}
          <br />
          Participants: {t.participants.current}/{t.participants.max}
        </Paragraph>
        <Flex>
          <Button onClick={edit}>EDIT</Button>
          <RightButton
            onClick={() =>
              dispatch({
                type: 'DELETE_TOURNAMENT',
                payload: { id: t.id },
                asyncDispatch: dispatch,
              })
            }
          >
            DELETE
          </RightButton>
        </Flex>
      </ContainerDiv>
    </SpacerDiv>
  );
}
