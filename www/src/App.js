import './App.css';
import TxTable from './TxTable';
import AppBar from './AppBar';

const App = () => {
  return (
    <div className="App">
      <AppBar />
      <div className="tx-table-container">
        <TxTable />
      </div>
    </div>
  );
}

export default App;
