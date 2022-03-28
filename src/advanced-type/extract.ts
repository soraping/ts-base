// type Extract<T, U> = T extends U ? T :never

class Person {

}

class Student extends Person {
    say(){
        console.log('i am student')
    }
}

// Student
// Student 是 Person 的子类，所以符合约束关系，返回类型 Student
// type TExtractType = Extract<Student, Person>


// never
// Person 是 Student 父类，不符合约束关系
// type TExtractType = Extract<Person, Student>

// 如果子类和父类都有相同的属性方法，那么可以通过相互的约束关系的

class Person1 {
    say(){
        console.log('i am student')
    }
}

// Person1
// 即便没有继承关系，只要有相同的属性方法，即可满足约束
type TExtractType = Extract<Person1, Student>


// 联合类型

// string | number
type TUnionExtractType1 = Extract<string | number, string | number>

// string | number
type TUnionExtractType2 = Extract<string | number, string | number | object>


/**
 * 为什么返回是 number 类型
 * 联合类型的 extends 其实可以做分解动作
 * 第一步： string extends number ? string : never => never
 * 第二步:  number extends number ? number : never => number
 * 第三步: 结果再联合   never | number => number
 */
// number
type TUnionExtractType3 = Extract<string | number, number>



/**
 * 第一步：string extends string | number ? string : never => string
 * 第二步：number extends string | number ? number : never => number
 * 第三步：symbol extends string | number ? symbol : never => never
 * 第四步：string | number | never => string | number
 */
// string | number
type TUnionExtractType4 = Extract<string | number | symbol, string | number>

// 函数
type func1 = (a: number, b: string) => string
type func2 = (a: number) => string

// func2
type type111 = func2 extends func1 ? func2 : never
type TExtractFuncType = Extract<func2, func1>


export {}