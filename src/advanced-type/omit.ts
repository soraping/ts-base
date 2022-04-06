// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface IPerson {
    id: string
    name: string
    age: number
    score: number
}

// 与pick相反，omit可以排除掉某些属性
type TOmitPersonType = Omit<IPerson, 'id'>

let ppp: TOmitPersonType = {
    name: 'ppp',
    age: 36,
    score: 1
}

export {}