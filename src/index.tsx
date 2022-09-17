import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Catalog } from './components/Catalog/Catalog';
import { GameCart } from './components/GameCart/GameCart';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/games',
        element: <Catalog />
      },
      {
        path: '/games/:game',
        element: <GameCart />
      }
    ]
  },
])

root.render(
  <Provider store={store}>
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
