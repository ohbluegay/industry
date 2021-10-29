const typeObj = {
    1: '上游',
    2: '中游',
    3: '下游'
}
export const formatEnter = (data) => {
    const sumLink = (source, type) => {
        const obj = {}
        source.map(item => {
            obj[item.link] = !obj[item.link] ? 1 : obj[item.link] + 1
        })
        return Object.keys(obj).map(sub => {
            return {
                label: sub,
                value: obj[sub],
                typeName: typeObj[type]
            }
        })
    }
    return {
        type1: sumLink(data.filter(item => item.type === '1'), 1),
        type2: sumLink(data.filter(item => item.type === '2'), 2),
        type3: sumLink(data.filter(item => item.type === '3'), 3)
    }
}