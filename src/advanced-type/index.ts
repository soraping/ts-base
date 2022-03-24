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