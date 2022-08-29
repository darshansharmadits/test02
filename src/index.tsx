import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './user/ui/user';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<BrowserRouter>
    <Routes>
    <Route path="/" element={<User sortBy={"userid"}></User>} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
