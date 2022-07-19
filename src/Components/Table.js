import TableCell from "./TableCell";

function Table({ data }) {

    const { columns, rows } = data

    return (
        <table>
            <thead>
                <tr>
                    {columns.map(col => <th key={`tableHeader-${col}`}>{col}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row, rowIndex) => {
                        return <tr key={rowIndex}>
                            {
                                columns.map(col => <TableCell row={row} col={col} key={`${rowIndex}-${col}`} />)
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;