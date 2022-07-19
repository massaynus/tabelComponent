import { useEffect, useState } from "react";

function TableCell({ col, row }) {

    const [datum, setDatum] = useState(null)
    const [newValue, setNewValue] = useState('')

    useEffect(() => {
        (
            async function () {
                const data = row[col]

                if (typeof data === 'function')
                    setDatum(await data())
                else setDatum(data)
            }
        )()
    }, [col, row])

    function doubleClickHandler() {
        setNewValue(datum || '')
        setDatum(null)
    }

    function keyPressHandler(e) {
        if (e.key === 'Enter') {
            row[col] = newValue
            setDatum(newValue)
            setNewValue('')
        }
    }

    return <td onDoubleClick={doubleClickHandler}>
        {
            datum === null
                ? <input type={'text'} value={newValue} onKeyUp={keyPressHandler} onChange={e => setNewValue(e.target.value)} />
                : <>{datum}</>
        }
    </td>
}

export default TableCell;
