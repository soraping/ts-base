export default class Person{
    constructor(private name: string){}

    getName(){
        console.log("hello")
        console.log(this.name)
        return this.name
    }
}