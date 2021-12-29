import './App.css';
import AppBar from './AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PricingPage from '../pages/PricingPage';
import TxPage from '../pages/TxPage';
import FaqPage from '../pages/FaqPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';

const App = () => {
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
