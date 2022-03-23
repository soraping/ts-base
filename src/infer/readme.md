#### `infer` 出现的位置

- 出现在 `extends` 条件语句后的函数类型的参数类型位置上

```javascript
interface IPerson {
    id: string
    name: string
    age: number
}

type TCustom = (params: IPerson) => string
type TInferType<T> = T extends (options: infer P) => any ? P : T

// 等效于 type TInferResult = IPerson
// infer 替换了函数参数的类型
type TInferResult = TInferType<TCustom>
```

- 出现在 `extends` 条件语句后的函数类型的返回值类型上

```javascript
type TPerson = (id: string) => IPerson
type TInferType<T> = T extends (options: any) => infer P ? P : T

// 等效于 TInferResult = IPerson
// infer 替换了返回值的类型
type TInferResult = TInferType<TPerson>
```

- 出现在类型的泛型具体化类型上

```javascript
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

// 替换了 set 元素的类型
let result: TElementOf<TPsetType>
```

#### `infer` 为什么只能出现在泛型约束的场景下

`infer` 是一个占位符，当泛型被真实类型替代后，真实类型会根据 `infer` 的位置推导出所对应的类型。

例如 `infer` 占了函数参数类型的位置，那真实类型过来后，会将函数参数的真实类型赋值给 `infer` 这个位置。

所以只有类型约束的场景下，才会有位置的匹配情况，然后根据位置来填充和提取真实类型。


#### `infer` 提取构造器参数

```javascript
class Person {
    constructor(private name: string, private age: number){
        
    }
}

// 构造器类型 这里的 T 可以是任意类的类型，是构造器的返回值，构造器返回值就是一个类的类型
type TConstructorType<T> = new (...args: any[]) => T
// new (...args: any[]) => Person
type PersonConstructorType = TConstructorType<Person>


// 构造器参数类型，这里的 T 是构造器类型
type TConstructorParamsType<T extends TConstructorType<any>> = T extends new (...params : infer P) => any ? P : never
// 元组类型 [name: string, age: number]
// type PersonConstructorParamsType = TConstructorParamsType<typeof Person>

// 也可以不用 typeof，直接用构造函数类型来做参数
type PersonConstructorParamsType = TConstructorParamsType<new (name: string, age: number) => Person>
```

#### 修改工厂函数

```javascript
// T 类的类型， P是构造器类型，用来提取参数类型
function createConstructFactory<T, P extends TConstructorType<any>>(constructor: TConstructorType<T>, ...args: TConstructorParamsType<P>){
    return new constructor(...args)
}

createConstructFactory<Person, typeof Person>(Person, "name", 12).say()
```