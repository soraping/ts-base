
/**
 * promise 构造器类型
 */
type TResolve<T=any> = (value: T) => any
type TReject<T=any>  = (reason: T) => any
type TExecuter<T> = (resolve: TResolve<T>, reject: TReject<T>) => any

/**
 * then 函数类型
 */
type TOnfulfilled<T=any> = (value: T) => any
type TOnrejected<T=any> = (reason: T) => any

enum PROMISE_STATUS {
    PENDING = 'pending',
    SUCCESS = 'success',
    REJECTED = 'rejected'
}

export default class MyPromise<T=any> {
    /**
     * promise 状态
     */
    status!: PROMISE_STATUS

    /**
     * 成功传递值
     */
    resolve_value!: T

    /**
     * 失败传递值
     */
    reject_reason!: T

    /**
     * then 方法异步成功方法队列
     */
    resolve_then_callbacks: (() => void)[] = []


    constructor(executer: TExecuter<T>) {

        this.status = PROMISE_STATUS.PENDING

        let resolve: TResolve = (value) => {
            // 状态凝固，非等待状态直接返回
            if(this.status != PROMISE_STATUS.PENDING) return

            this.status = PROMISE_STATUS.SUCCESS
            // 需要传输的异步值
            this.resolve_value = value
            
            // 异步的场景
            if(this.resolve_then_callbacks.length > 0){
                this.resolve_then_callbacks.forEach(cb => cb())
            }
        }

        let reject: TReject = (reason) => {
            if(this.status != PROMISE_STATUS.PENDING) return

            this.status = PROMISE_STATUS.REJECTED
            this.reject_reason = reason
        }

        executer(resolve, reject)
    }

    /**
     * then 函数
     * 该函数本身是一个同步函数，只有状态是非 padding 状态时才会执行
     * 即便在外部被调用多次，如果状态是 pending，那么 then 函数内部的 promiese实例化操作也是无效执行的
     * 因为内部会做状态判断
     * @param onfulfilled 
     * @param onrejected 
     * @returns 
     */
    then(onfulfilled: TOnfulfilled<T>, onrejected: TOnrejected<T>){
        console.log(`then 函数, 当前 status => ${this.status}`)
        // 这里返回的是一个新的实例，调用几次then，就返回一个新的实例
        return new MyPromise((resolve, reject) => {
            console.log('then 中调用 MyPromise 构造器')
            // 只有对应的状态，才能在 then 中执行
            if(this.status == PROMISE_STATUS.SUCCESS){
                let then_resolve_value = onfulfilled(this.resolve_value)
                resolve(then_resolve_value)
            }
            
            if(this.status == PROMISE_STATUS.REJECTED){
                let then_reject_reason = onrejected(this.reject_reason)
                reject(then_reject_reason)
            }

            // 异步的场景
            /**
             * 当异步resolve的时候，需要等待异步执行完毕，才能执行 then 中的 resolve
             * 异步resolve 一直不执行，那么状态永远是 pending
             * 所以要处理异步的情况就要用到 订阅发布模式
             * 用一个事件队列来存储 then 方法的执行函数
             * 当异步的 resolve 被执行的时候，状态就变成了正常状态
             */
            if(this.status == PROMISE_STATUS.PENDING){
                this.resolve_then_callbacks.push(() => {
                    let then_resolve_value = onfulfilled(this.resolve_value)

                    // 判断 onfulfilled 函数的返回值，promise/normal 分别处理
                    if(isPromise(then_resolve_value)){
                        // 如果返回的是 promise 实例，那么就等待 promise 实例的状态变化
                        // 方法 1，常规方法，就是利用promise.then方法
                        // then_resolve_value.then((promise_value_resolve) => {
                        //     resolve(promise_value_resolve)
                        // }, (promise_value_reason) => {
                        //     reject(promise_value_reason)
                        // })

                        // 方法2，巧用事件队列宏任务，异步事件，谁先入栈，则先调用
                        // 由于在外部，无论是微任务还是宏任务，调用的优先级肯定比这个优先级高，
                        // 所以这个异步方法是最后执行的
                        setTimeout(() =>{
                            resolve(then_resolve_value.resolve_value)
                        }, 10)


                    }else{
                        resolve(then_resolve_value)
                    }
                    
                })
            }
        })
    }
}

/**
 * 是否是 promise 实例
 * @param value 
 * @returns 
 */
function isPromise(value: any): value is Promise<any> {
    return isObject(value) && isFunction(value.then)
}

function isObject(value: any): value is Object {
    return typeof value === 'object' && value !== null
}

function isFunction(value: any): value is Function {
    return typeof value === 'function'
}



new MyPromise<string>((resolve, reject) => {
    // 第一种异步场景
    // setTimeout(() => {
    //     resolve('hello world')
    // }, 0)
    resolve('hello world')
}).then((res) => {
    // console.log('第1个then res', res)
    // return '第一个then返回值'

    // 第二种异步场景
    return new MyPromise((resolve1, reject) => {
        // 这个异步方法肯定是先执行的，它先进去事件循环
        setTimeout(() =>{
            resolve1('第一个then返回值')
        })
    })

}, (reason) => {
    console.log('第1个then err', reason)
    return 'then111err'
}).then((res) => {
    console.log('第2个then res', res)
    return '第二个then返回值'
}, (reason) => {
    console.log('第2个then err', reason)
}).then((res) => {
    console.log('第3个then res', res)
}, (reason) => {})
