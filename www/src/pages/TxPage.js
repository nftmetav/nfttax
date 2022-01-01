import React from 'react';
import TxTable from '../components/TxTable';

// TODO: default width of the tx table should be smaller
function TxPage() {
  return (
    <div className="tx-table-container">
      <TxTable />
    </div>
  );
}

export default TxPage;
