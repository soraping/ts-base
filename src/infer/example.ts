interface Action<T = any>{
    type: string
    payload?: T
}

// depay 函数类型
type asnycMethod<T, U> = (promise: Promise<T>) => Promise<Action<U>>

// searchFoodByCity 函数类型
type syncMethod<T, U> = (action: Action<T>) => Action<U>

class FoodModule {
    public static topic: string
    public count!: number

    delay(promise: Promise<number>){
        return promise.then((second: number) => ({
            type: 'delay',
            payload: `延迟 ${second} 秒`
        }))
    }

    searchFoodByCity(action: Action<string>){
        return {
            payload: action.payload,
            type: 'searchFoodByCity'
        }
    }
}

/**
 * 1. FoodModule 参数类型和返回值类型被部分过滤 如下
 * 过滤后的 delay 方法
 * type asyncMethodConnect<T, U> = (input: T) => Action<U>
 * 
 * 过滤后的 searchFoodByCity 方法
 * type syncMethodConnect<T, U> = (action: T) => Action<U>
 */
 type asyncMethodConnect<T, U> = (input: T) => Action<U>
 type syncMethodConnect<T, U> = (action: T) => Action<U>

/**
 * 2. 最终实现，把这两个类型和原来的 FoodModule 类型进行合并:
 * type Convert = () => {
 *      delay: asyncMethodConnect<number, string>
 *      searchFoodByCity: syncMethodConnect<string, string>   
 * }
 */

// 1. 遍历对象所有的键值对
type Mapping<T extends object> = {
    [K in keyof T]: T[K]
}

// 2. 只遍历方法(过滤掉其他非方法的属性)
type MappingOfFunc<T extends object> = {
    // 在 TypeScript 4.1 及更高版本中，可以使用映射类型中的as子句重新映射映射类型中的键
    [K in keyof T as T[K] extends Function ? K : never]: T[K]
}

// 3. 对象方法的判断
type MethodOf<T extends object> = {
    [K in keyof T as T[K] extends Function ? K : never]: T[K] extends asnycMethod<infer ArgType, infer ReturnType>
        // 函数先判断是否是异步函数，如果是那么就返回异步函数的返回值类型
        ? asyncMethodConnect<ArgType, ReturnType>
        // 判断同步函数的类型
        : T[K] extends syncMethod<infer ArgType, infer ReturnType>
        ? syncMethodConnect<ArgType, ReturnType>
        : never
}

// 4. 合并，鼠标放上去后就能看到类型和题目一致
type Convert = () => {
    [K in keyof MethodOf<FoodModule>]: MethodOf<FoodModule>[K]
}


// typescript4.1+新特性 使用 Awaited 关键字 获取promise的返回值

// 递归 Action 类型 同步方法
type UnWrapAction<T> = T extends Action<infer R> ? UnWrapAction<R> : T
type PickMethod<T extends object> = {
    [K in keyof T as T[K] extends Function ? K : never]: T[K] extends asnycMethod<infer ArgType, infer ReturnType>
        ? asnycMethod<Awaited<ArgType>, Awaited<ReturnType>>
        : T[K] extends syncMethod<infer ArgType, infer ReturnType>
        ? syncMethod<UnWrapAction<ArgType>, UnWrapAction<ReturnType>>
        : never
}
type Convert2 = () => {
    [K in keyof PickMethod<FoodModule>]: PickMethod<FoodModule>[K]
}

