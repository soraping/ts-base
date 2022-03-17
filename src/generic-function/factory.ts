class Person {
    constructor(private name: string){
    }
    getName(){
        console.log(this.name)
    }
}

type TConstructor<T> = new (...args: any) => T


function createConstructFactory<T>(Con: TConstructor<T>): T{
    console.log("construct")
    return new Con("zhangsan")
}

let p = createConstructFactory(Person)
p.getName()