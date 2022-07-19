import TableCell from "./TableCell";

function Table({ data, onDeleteRow, onDeleteColumn }) {

    const { columns, rows } = data

    return (
        <table>
            <thead>
                <tr>
                    {columns.map(col => <th key={`tableHeader-${col}`}>
                        {col} {col !== 'Niveau' && <button onClick={() => onDeleteColumn(col)}>X</button>}
                    </th>)}
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row, rowIndex) => {
                        return <tr key={rowIndex}>
                            {
                                columns.map(col => <TableCell row={row} col={col} key={`${rowIndex}-${col}`} />)
                            }
                            <td>
                                <button onClick={() => onDeleteRow(rowIndex)}>Delete</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;