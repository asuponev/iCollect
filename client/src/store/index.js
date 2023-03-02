import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from './reducers/userReducer';
import { collectionsReducer } from './reducers/collectionsReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    collections: collectionsReducer,
  }
});