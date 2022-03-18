type MyClassDecorator = <T>(targetClass: {new(...args: any): T}) => void

function Controller(rootPath: string): MyClassDecorator{
    return function(targetClass){
        let reg = /function (.{1,})\(/;
        console.log("constructor name", reg.exec(targetClass.toString())![1])
    }
}

@Controller('/root')
class Student111 {
    
}