import type { Tournament } from '../actions/tournaments';
import { API_TOURNAMENTS_URL } from '../constants/api';

export interface TournamentState {
  data: Tournament[];
  error: any | undefined;
  loading: boolean;
}

interface Action {
  type: string;
  asyncDispatch: (v: any) => any;
  payload: any | undefined;
}

const initialState: TournamentState = {
  data: [],
  error: undefined,
  loading: true,
};

export default function tournaments(
  state: TournamentState = initialState,
  action: Action
) {
  const setErr = (e: any | undefined) =>
    action.asyncDispatch({ type: 'SET', payload: { error: e } });
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.payload };
    case 'GET_ALL_TOURNAMENT':
      fetch(API_TOURNAMENTS_URL + '?q=' + (action.payload.query || ''))
        .then((v) => v.json())
        .then((v) =>
          action.asyncDispatch({
            type: 'SET',
            payload: { data: v, loading: false },
          })
        )
        .catch(setErr);
      break;
    case 'EDIT_TOURNAMENT':
      fetch(API_TOURNAMENTS_URL + '/' + action.payload.id, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload),
        method: 'PATCH',
      })
        .then((v) => v.json())
        .then((v) => {
          let arr = state.data;
          let index = arr.findIndex((v) => v.id === action.payload.id);
          arr[index] = v;

          action.asyncDispatch({
            type: 'SET',
            payload: { data: arr, loading: false },
          });
        })
        .catch(setErr);
      break;
    case 'DELETE_TOURNAMENT':
      fetch(API_TOURNAMENTS_URL + '/' + action.payload.id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
      })
        .then((v) => v.json())
        .then((v) => {
          action.asyncDispatch({
            type: 'SET',
            payload: {
              data: state.data.filter((v) => v.id !== action.payload.id),
              loading: false,
            },
          });
        })
        .catch(setErr);
      break;
    case 'CREATE_TOURNAMENT':
      fetch(API_TOURNAMENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: action.payload.name }),
      })
        .then((v) => v.json())
        .then((v) => {
          action.asyncDispatch({
            type: 'SET',
            payload: { data: state.data.concat(v) },
          });
        })
        .catch(setErr);
  }
  return state;
}
