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

### 类型分发

### 装饰器