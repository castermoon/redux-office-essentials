import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'

const persistConfig = {  // **
  key: 'root',// 储存的标识名
  storage, // 储存方式
  whitelist: ['posts'] //白名单 模块参与缓存
}

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer) // **

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store)

export default { store, persistor };


