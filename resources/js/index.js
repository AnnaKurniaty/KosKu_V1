import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.js';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './state';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './state/api'

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
})
setupListeners(store.dispatch)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
