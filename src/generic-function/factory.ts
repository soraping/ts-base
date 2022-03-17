class Person1 {
    constructor(private name1: string){

    }
    getName(){
        console.log(this.name1)
        
    }
}

type TConstructor<T> = new (...args: any) => T


function createConstructFactory<T>(Con: TConstructor<T>): T{
    // 构造函数也是 Fuction ，Fuction type 没有 name 属性，只能通过tostring 方法截取
    // console.log("constructor", Con.toString())
    let reg = /function (.{1,})\(/;
    console.log("constructor name", reg.exec(Con.toString())![1])
    return new Con("zhangsan")
}

let p = createConstructFactory<Person1>(Person1)
p.getName()