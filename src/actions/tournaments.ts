import { RootState } from '../reducers';

export interface Tournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  startDate: string;
  participants: {
    current: number;
    max: number;
  };
}
