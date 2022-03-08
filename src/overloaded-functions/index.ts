/**
 * 函数重载
 * 类方法重载
 */
import * as students from './data.json'

type TStudent = {
    id: number
    name: string
    age: number
    score: number
}

export function getStudent(id: number): TStudent
export function getStudent(name: string): TStudent
export function getStudent(className: string, pageSize: number): TStudent[]

export function getStudent(props: any, pageSize: number = 0): TStudent | TStudent[] | undefined{
    if(typeof props == 'number'){
        return students.data.filter(student => student.id == props)[0]
    }
    if(typeof props == 'string'){
        if(pageSize){
            return students.data.filter(student => student.className == props).slice(0, pageSize)
        }else{
            return students.data.filter(student => student.name == props)[0]
        }
    }
}

