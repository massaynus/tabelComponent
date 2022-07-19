import { useEffect, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import { addColumn, generateDummyData, getColumns } from './Lib/Datalayer'

function App() {
  const [columns, setColumns] = useState(['Niveau'])
  const [data, setData] = useState([])

  const [newColumn, setNewColumn] = useState('')
  const [newRow, setNewRow] = useState('')

  function addColumnHandler() {
    const newData = addColumn(data, newColumn)
    setData(newData)
    setColumns(getColumns(newData))
    setNewColumn('')
  }

  function addRowHandler() {
    const newDatum = {}
    for (const col of columns) newDatum[col] = null
    newDatum['Niveau'] = newRow

    setData(d => [...d, newDatum])
    setNewColumn('')
  }

  useEffect(() => {
    const data = generateDummyData()
    setColumns(getColumns(data))
    setData(data)
  }, [])

  return (
    <div className="App">
      <h1>Test</h1>

      <div className='stackEl'>
        <input type={'text'} value={newColumn} onChange={(e) => setNewColumn(e.target.value)} />
        <button onClick={addColumnHandler}>Add Column</button>
      </div>

      <div className='stackEl'>
        <input type={'text'} value={newRow} onChange={(e) => setNewRow(e.target.value)} />
        <button onClick={addRowHandler}>Add Row</button>
      </div>

      <Table data={{ columns: columns, rows: data }} />
    </div>
  );
}

export default App;
