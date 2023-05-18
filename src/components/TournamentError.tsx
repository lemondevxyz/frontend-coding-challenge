import React from 'react';
import Paragraph from './Paragraph';
import Button from './Button';
import Flex from './Flex';

export default function TournamentError() {
  return (
    <Flex justify="center" direction="column">
      <Paragraph>An error occurred.</Paragraph>
      <Button>REFERSH</Button>
    </Flex>
  );
}
