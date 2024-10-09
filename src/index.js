import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';
import { QuestionContextProvider} from './hooks/QuestionContextProvider.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuestionContextProvider >
      <App />
    </QuestionContextProvider>
  </React.StrictMode>
);

