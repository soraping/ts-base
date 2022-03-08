/**
 * 单例
 */
export default class MyStorage {

    private static instance: MyStorage

    /**
     * 第一步：使用 private 修饰构造器，防止外部实例化类
     */
    private constructor(){}

    /**
     * 第二步，提供给外部获取类实例的唯一方法
     * 第三步，外部直接通过该方法获取实例
     * MyStorage.getInstance()
     * @returns 
     */
    static getInstance(){
        if(!this.instance){
            this.instance = new MyStorage()
        }
        return this.instance
    }

    getItem(key: string){
        let data = localStorage.getItem(key)
        if(data){
            return JSON.parse(data)
        }
    }

    setItem(key: string, data: any){
        let item = typeof data === 'string' ? data : JSON.stringify(data)
        localStorage.setItem(key, item)
    }

}