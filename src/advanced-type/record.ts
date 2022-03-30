// type Record<T extends keyof any, T> = {
//     [P in K]: T
// }

interface IPerson {
    id: string
    name: string
    age: number
    score: number
}

type TPersonType<T, K> = K extends keyof T ? T[K] : never

// number
type TPersonValueType = TPersonType<IPerson, "age">


/**
 * ts 约定
 * keyof any => string | number | symbol
 */
type TAnyKeyType<K> = K extends keyof any ? K : never

let cname = "zhangsan"
// string
type personName = TAnyKeyType<typeof cname>



/**
 * P in K
 * [P in string]
 * 索引是 string
 */
type TResultType1 = Record<string, IPerson>
let p11: TResultType1 = {
    'class1': {id: 'c111', name: 'zhangsan', age: 1, score: 12}
}

type TResultType2 = Record<number, IPerson>
// 数组的索引默认是数字
let p22: TResultType2 = [
    {id: 'c111',name: 'zhangsan', age: 1, score: 12},
    {id: 'c112', name: 'lisi', age: 2, score: 13}
]


/**
 * 异步数据扁平化
 */
let dataList: IPerson[] = [
    {
        id: 'd101',
        'name': 'zhangsan', 
        'age': 1, 
        score: 12
    }, {
        id: 'd102',name: 'lisi',  age: 2, score: 13
    }
]

/**
 * {id: IPerson}
 */
let recordData : Record<string, IPerson> = {}
dataList.forEach(data => {
    recordData[data.id] = data
})

console.log(recordData)


export {}