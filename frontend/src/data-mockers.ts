export const generateFalseHistory = (limit = 350) => {
    const map: any = {}
    for (let i=0; i<limit; i++) {
        const date = new Date(Date.now()-i*3600*24*1000)
        const currentDateMark = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        map[currentDateMark] = Math.random() > 0.5
    }

    return map
}

// generateFalseHistory(100)