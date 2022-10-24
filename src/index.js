import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 👇️ if you use TypeScript, add non-null (!) assertion operator
// const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

serviceWorkerRegistration.register();


