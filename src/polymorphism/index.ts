/**
 * 多态
 */
class Vehicle {
    getName(){
        return 'this is Vehicle'
    }

    getCost(){
        return 100
    }
}

class Car extends Vehicle {
    getName(){
        return 'this is car'
    }

    getCost(){
        return 500
    }

    carcar(){
        console.log("carcar")
    }

}

class Truck extends Vehicle {
    getName(){
        return 'this is Truck'
    }

    getCost(){
        return 1500
    }

    trucktruck(){
        console.log("trucktruck")
    }
}

class Bus extends Vehicle {
    getName(){
        return 'this is Bus'
    }

    getCost(){
        return 1000
    }

    busbus(){
        console.log("busbus")
    }
}


class Customer<T extends Vehicle> {

    constructor(private vehicles: T[] = []){}

    insertValue(val: T){
        this.vehicles.push(val)
    }

    getValues(){
        return this.vehicles
    }

    getPayCostTotal(){
        return this.getValues().reduce((prev, cur) => {
            return prev + cur.getCost()
        }, 0)
    }

    payCost(vehicle: T){
        // 多态调用
        console.log(vehicle.getName())
        console.log(vehicle.getCost())

        // 类型守卫 调用专有方法
        if(isCar(vehicle)){
            vehicle.carcar()
        }else if(isBus(vehicle)){
            vehicle.busbus()
        }
    }
}

/**
 * 自定义守卫
 * @param ccc 
 * @returns 
 */
function isBus(ccc: any): ccc is Bus {
    return ccc instanceof Bus
}
function isCar(ccc: any): ccc is Car {
    return ccc instanceof Car
}

let customer = new Customer()
customer.insertValue(new Car())
customer.insertValue(new Truck())

console.log(customer.getPayCostTotal())

// // 父类的类型指向任意子类
// // 可以调用子类重写的父类方法
// let vehicle: Vehicle = new Car()

// customer.payCost(vehicle)

