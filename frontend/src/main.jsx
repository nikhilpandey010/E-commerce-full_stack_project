import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './redux/store/store.jsx';
import './index.css';
import { setupTokenRefreshTimer } from './utils/auth.jsx';

// After store initialization
setupTokenRefreshTimer(Store);

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
     <App />
  </Provider>
   
 
)
