// type Exclude<T, U> = T extends U ? never : T

interface IStudent{
    name: string
    age: number
    socre: number
}

// name"| "age"
type TExtractType = Extract<"name"| "age" | "other", keyof IStudent>


/**
 * 第一步: "name" extends keyof IStudent ? never : "name" => never
 * 第二步: "age" extends keyof IStudent ? never : "age" => never
 * 第三步: "other" extends keyof IStudent ? never : "other" => "other"
 * 第四步: never | never | "other" => "other"
 */
// other
type TExcludeType = Exclude<"name"| "age" | "other", keyof IStudent>