import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Container';
import H4 from './components/H4';
import TournamentHeader from './components/TournamentHeader';
import TournamentBody from './components/TournamentBody';

const App = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <TournamentHeader />
      <TournamentBody />
    </Container>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
