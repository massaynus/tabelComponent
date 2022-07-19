export function generateNumber(max) {
    return Math.floor(Math.random() * max * 100) / 100
}

export function generateDummyData(count = 4) {
    const arr = []
    const levels = ['Mel', 'Mel', 'DSP1', 'C5 inf']

    while (count--) {
        const datum = {
            'Niveau': levels.shift(),
            'BPL': null,
            'MgO': null,
            'MO': null,
            'SiO2': null,
            'CO2': null,
        }

        arr.push(datum)
    }

    return arr
}

export function addColumn(data, newColumn) {
    for (const row of data) {
        row[newColumn] = null
    }

    return data
}

export function removeColumn(data, column) {
    const newData = []
    for (const row of data) {
        const newRow = { ...row }
        delete newRow[column]
        newData.push(newRow)
    }

    return newData
}

export function getColumns(data) {
    const columns = new Set()

    for (const row of data)
        for (const col in row)
            columns.add(col)

    return Array.from(columns)
}
