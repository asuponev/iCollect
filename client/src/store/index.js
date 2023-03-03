import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from './reducers/userReducer';
import { collectionReducer } from './reducers/collectionReducer';
import { collectionsReducer } from './reducers/collectionsReducer';
import { itemsReducer } from './reducers/itemsReducer';
import { adminReducer } from './reducers/adminReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    collection: collectionReducer,
    collections: collectionsReducer,
    items: itemsReducer,
    admin: adminReducer
  }
});