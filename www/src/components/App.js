import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppBar from './AppBar';
import FaqPage from '../pages/FaqPage';
import HomePage from '../pages/HomePage';
import PricingPage from '../pages/PricingPage';
import ProfilePage from '../pages/ProfilePage';
import React from 'react';
import SettingsPage from '../pages/SettingsPage';
import TxPage from '../pages/TxPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tx" element={<TxPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
