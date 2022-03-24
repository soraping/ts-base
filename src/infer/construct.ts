class Person {
    constructor(private name: string, private age: number){
        
    }
    say(){
        console.log(`my name is ${this.name} and my age is ${this.age}`)
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


// T 类的类型， P是构造器类型，用来提取参数类型
function createConstructFactory<T, P extends TConstructorType<any>>(constructor: TConstructorType<T>, ...args: TConstructorParamsType<P>){
    return new constructor(...args)
}

createConstructFactory<Person, typeof Person>(Person, "name", 12).say()

export {}