import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import { store } from './store/index';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <>
          <App />
        </>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
