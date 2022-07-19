export function generateNumber(max) {
    return Math.floor(Math.random() * max * 100) / 100
}

export function generateDummyData(count = 5) {
    const arr = []

    while (count--) {
        const datum = {
            'Niveau': 'DSP1',
            'BPL': generateNumber(100),
            'MgO': generateNumber(5),
            'MO': generateNumber(5),
            'SiO2': generateNumber(50),
            'CO2': generateNumber(20),
        }

        datum['%'] = async () => {
            console.log('processing: ', JSON.stringify(datum, null, 2))
            await new Promise(res => setTimeout(res, 2000))
            return generateNumber(100)
        }

        arr.push(datum)
    }

    return arr
}

export function addColumn(data, newColumn) {
    for (const row of data) {
        console.log(row)
        row[newColumn] = null
    }

    return data
}

export function getColumns(data) {
    const columns = new Set()

    for (const row of data)
        for (const col in row)
            columns.add(col)

    return Array.from(columns)
}
