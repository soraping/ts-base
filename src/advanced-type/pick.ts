// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P]
// }

interface IPerson {
    id: string
    name: string
    age: number
    score: number
}

type TPickPerson = Pick<IPerson, 'name' | 'age'>

let zhang: TPickPerson = {
    name: 'Zhang',
    age: 36,
    // score: 1
}


export {}