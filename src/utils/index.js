export const formatEnter = (data) => {
    const sumLink = (source) => {
        const obj = {}
        source.map(item => {
            obj[item.link] = !obj[item.link] ? 1 : obj[item.link] + 1
        })
        return Object.keys(obj).map(sub => {
            return {
                name: sub,
                value: obj[sub]
            }
        })
    }
    return {
        type1: sumLink(data.filter(item => item.type === '1')),
        type2: sumLink(data.filter(item => item.type === '2')),
        type3: sumLink(data.filter(item => item.type === '3'))
    }
}