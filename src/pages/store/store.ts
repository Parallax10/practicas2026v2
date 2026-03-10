import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import motoReducer from './slices/motoSlice';
import productsReducer from './slices/prodSlice';
import favReducer from './slices/favsSlice'; 

const rootReducer = combineReducers({
    user: userReducer,
    motos: motoReducer,
    products: productsReducer,
    favorites: favReducer, 
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'favorites'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
        serializableCheck: false, 
        }),
    });
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];