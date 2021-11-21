import { FC } from 'react';

import { Provider } from 'react-redux';

import { AutocompleteInput } from './components/AutocompleteInput';
import { ReturnComponentType } from './types';

import { store } from 'redux/store';

export const App: FC = (): ReturnComponentType => (
  <Provider store={store}>
    <AutocompleteInput />
  </Provider>
);
