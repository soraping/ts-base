### 函数重载

### 静态方法

### 类型守卫

### 泛型函数

#### 普通函数类型

```typescript
// 函数类型
type TF = (...args: any) => any

// 函数接口
interface TF {
    (...args: any): any
}
```

#### 类名意义

```javascript
class Person {
    constructor(private name: string){
    }
}
```

- 类名可以做为类型

```javascript
let p: Person = new Person("xx");
```

- 类构造函数

类构造函数 `constructor` 其实是有返回值的，该返回值的类型是这个类，即返回的是这个类的实例

```javascript
class Person {
    constructor(private name: string): Person{
    }
}
```

那就可以推导出类的构造函数类型

```typescript
type TPersonConstructor = new (name: string) => Person
```

这里的 `new` 关键字不是实例化操作，而是区别于普通函数类型，告诉编译器这个函数是构造函数

返回了 `Person` 类型表明这个构造函数类型指定了这个返回值类型，可以写一个通用的构造函数类型

```typescript
type TConstructor = new (...args: any) => any
```
使用泛型

```typescript
type TConstructor<T> = new (...args: any) => T
```

也可以使用接口表示

```typescript
interface IConstructor<T> {
    new (...args: any): T
}
```

### 联合类型，交叉类型

```typescript
interface Foo {
    name: string
    age: number
}

interface Bar {
    bar: string;
    name: string;
}

// 联合类型
let foo1: Foo | Bar = {
    name: 'zhangsan',
    age: 11,
    bar: 'xxx'
}
foo1.name

// 交叉类型
let foo2: Foo & Bar = {
    name: 'zhangsan',
    age: 12,
    bar: 'ccc'
}
```

#### 联合类型
`Foo | Bar` 表示有 `foo` 和 `name` 属性的对象集和有 `bar` 和 `name` 属性的对象集的并集。属于这类集合的对象一定含有 `name` 属性，可能有 `foo` 属性或者 `bar` 属性，所以使用这个类型时，只能点出 `name` 属性

#### 交叉类型

`Foo & Bar` 表示具有 `foo` 和 `name` 属性的对象集和具有 `bar` 和 `name` 属性的对象集的交集。换句话说，集合包含了属于由 `Foo` 和 `Bar` 表示的集合的对象。只有具有这三个属性（foo、bar 和 name）的对象才属于交集

`Foo` 和 `Bar` 是 `Foo & Bar` 的子集

### 类型分发

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

### 装饰器