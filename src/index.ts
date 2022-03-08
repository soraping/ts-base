import { getStudent } from './overloaded-functions'
import MyStorage from './singleten'

export default class Person{
    constructor(private name: string){}

    getName(){
        console.log("hello")
        console.log(this.name)
        return this.name
    }

    queryStudent(){
        let student = getStudent("NO1", 2);
        console.log(student)
        MyStorage.getInstance().setItem("student", student)
    }
}