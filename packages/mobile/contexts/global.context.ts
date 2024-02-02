import React, {Dispatch} from 'react';
import { User } from '../types/types';

export interface InitialState {
  user: User | null;
}

export interface GlobalContextProps extends InitialState {
  dispatch?: Dispatch<Action>;
  checkLogin?: () => void;
  onLogout?: () => void;
}

interface Action {
  type: string;
  payload: any;
}

export const initialState: InitialState = {
  user: null
};

export const GlobalContext: React.Context<GlobalContextProps> = React.createContext({...initialState});
