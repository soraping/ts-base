interface Foo {
    name: string
    age: number
}

interface Bar {
    bar: string;
    name: string;
}

interface Other {
    className: string
    socre: number
}

let foo: Foo = {
    name: 'zhangsan',
    age: 11
}

let bar: Bar = {
    name: 'lisi',
    bar: 'xxx'
}

let other: Other = {
    className: 'class1',
    socre: 98
}

// // 联合类型
// let foo1: Foo | Bar = {
//     name: 'zhangsan',
//     age: 11,
//     bar: 'xxx'
// }

// // 交叉类型
// let foo2: Foo & Bar = {
//     name: 'zhangsan',
//     age: 12,
//     bar: 'ccc'
// }

// function cross<T extends Foo, U extends Bar>( foo: T, bar: U ): T & U{
//     return {...foo, ...bar}
// }

// console.log(cross(foo, bar))

function cross<T extends Foo, U extends Bar>( foo: T, bar: U , other ?: any): T & U
function cross<T extends Foo, U extends Bar, V extends Other>( foo: T, bar: U , other: V): T & U & V

function cross<T extends Foo, U extends Bar, V extends Other>( foo: T, bar: U , other: V){
    other = other || {}
    return {...foo, ...bar, ...other}
}

console.log(cross(foo, bar))
console.log(cross(foo, bar, other))