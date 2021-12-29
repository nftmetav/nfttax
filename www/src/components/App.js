import './App.css';
import AppBar from './AppBar';
import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TxPage from './TxPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tx" element={<TxPage />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
