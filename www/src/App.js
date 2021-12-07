import './App.css';
import TxTable from './TxTable';
import AppBar from './AppBar';

function App() {
  return (
    <div className="App">
      <AppBar />
      <div style={{ display: 'flex',  justifyContent:'center', marginTop: '20px' }}>
        <TxTable />
      </div>
    </div>
  );
}

export default App;
