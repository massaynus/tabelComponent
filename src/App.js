import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import { addColumn, generateDummyData, getColumns, removeColumn } from './Lib/Datalayer'

function App() {
  const [columns, setColumns] = useState(['Niveau'])
  const [data, setData] = useState([])

  const [newColumn, setNewColumn] = useState('')
  const [newRow, setNewRow] = useState('')

  const [dataJson, setDataJson] = useState('')

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

  async function submitHandler() {
    // API CALL
    const res = await axios.post('http://localhost:5000/data', data)
    alert(`server responded with status ${res.status}`)
    console.log('server data: ', res.data)
    const newData = res.data
    setColumns(getColumns(newData))
    setData(newData)
  }

  function DeleteRowHandler(idx) {
    setData(d => {
      const target = d[idx]
      return d.filter(i => i !== target)
    })
  }

  function DeleteColumnHandler(column) {
    console.log('DELETE COLUMN:', column)
    const dataCopy = removeColumn(data, column)
    setColumns(getColumns(dataCopy))
    setData(dataCopy)
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

      <div className='stackEl'>
        <pre>{dataJson}</pre>
        <br />
        <button onClick={submitHandler}>Submit data</button>
      </div>

      <Table data={{ columns: columns, rows: data }} onDeleteRow={DeleteRowHandler} onDeleteColumn={DeleteColumnHandler} />
    </div>
  );
}

export default App;
