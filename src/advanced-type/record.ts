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


/**
 * Record，object, map 区别
 */
// object 就是一个数据类型
let pp: object = {name: 'lisi', 111: 'cccc'}
// 这里是会报错的，因为编译器会往 object 类型上找 111 这个属性，发现 object 类型上没有，所以会报错
// 所以 object 只能赋值，但不能修改。
// pp[111] = 'ddd'

// map 类型是一个底层数据结构
let qq = new Map<string, IPerson>()
qq.set('class111', recordData['d101'])
// Map 相对于 Record 是一个比较重的一个类型，而且 Map 是需要 new 的，所以会占用更多的资源空间。
// 读取数据和展示数据频繁，那就使用 Record
// 增删改多的情况使用 Map



export {}