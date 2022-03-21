interface IPerson {
    id: string
    name: string
    age: number
}

// type TCustom = (params: IPerson) => string
// type TInferType<T> = T extends (options: infer P) => any ? P : T

// type TInferResult = TInferType<TCustom>


type TPerson = (id: string) => IPerson
type TInferType<T> = T extends (options: any) => infer P ? P : T

type TInferResult = TInferType<TPerson>


let p1: IPerson = {
    id: 'x111',
    name: 'zhangsan',
    age: 11
}

let p2: IPerson = {
    id: 'x112',
    name: 'lisi',
    age: 12
}

let pSet = new Set<IPerson>([p1, p2])
type TPsetType = typeof pSet;

type TElementOf<T> = T extends Set<infer R> ? R : never

let result: TElementOf<TPsetType>