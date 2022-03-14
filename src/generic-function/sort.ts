/**
 * 快排
 * @param arr 
 */
function quickSort<T extends string | number>(arr: T[]): T[]{
    if(arr.length < 2) return arr
    // 1. 以中间元素作为基数
    let mid = arr.splice((arr.length / 2), 1)[0]
    // 2. 定义两个空数组
    let right: T[] = []
    let left: T[] = []

    // 3. 遍历数组，将小于基数的放在左，大于基数的放在右侧
    for(let i = 0; i < arr.length; i++){
        if(arr[i] < mid){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    // 4. 递归调用左右数组，并拼接成新数组
    return quickSort(left).concat(mid, quickSort(right))
}
console.log(quickSort([7,4,8,12,81,45,12,96,33]));


/**
 * 中文字符排序
 * @param arr 
 * @returns 
 */
function sortChinese<T extends string>(arr: T[]): T[]{
    return arr.sort((first, second) => first.localeCompare(second, 'zh-CN'))
}
let arr = ["南京", "上海", "北京", "广州", "苏州", "成都", "武汉"]
console.log(sortChinese(arr))

/**
 * 字符串自排序
 * @param str 
 */
function sortStrSelf(str: string): string{
    let strArr = str.split('')
    return quickSort(strArr).join('')
}
console.log(sortStrSelf('cabinoewd'))

