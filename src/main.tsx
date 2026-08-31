import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './styles/globals.css';

// async function enableMocking(): Promise<void> {
//   if (import.meta.env.DEV && import.meta.env.VITE_MOCK_NETWORK !== 'false') {
//     const { worker } = await import('./test/mocks/browser');
//     await worker.start({ onUnhandledRequest: 'bypass' });
//   }
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
