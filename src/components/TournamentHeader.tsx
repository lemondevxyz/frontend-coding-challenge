import React from 'react';
import Flex from './Flex';
import Input from './Input';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { promptGetName } from './TournamentSingle';

export default function TournamentHeader() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'GET_ALL_TOURNAMENT',
      asyncDispatch: dispatch,
      payload: { query },
    });
  }, [query, dispatch]);

  const createTournament = () => {
    let n = promptGetName('Enter your new tournament name');
    if (n)
      dispatch({
        type: 'CREATE_TOURNAMENT',
        payload: { name: n },
        asyncDispatch: dispatch,
      });
  };

  return (
    <Flex justify="space-between">
      <Input
        type="text"
        placeholder="Search tournaments"
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
        }}
      />
      <Button onClick={createTournament}>CREATE TOURNAMENT</Button>
    </Flex>
  );
}
