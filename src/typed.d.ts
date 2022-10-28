type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
type BaseOptionType = {
  label: string
  value: string | number
  isDisabled?: boolean
}
type PaginationParams = {
  per_page?: number
  page?: number
}
type PagingDataInf = {
  currentPage: string
  hasMorePages: boolean
  lastPage: number
  totalRecords: number
}
type PagingInf = {
  paging: PagingDataInf
}
type WithPaging<T> = PagingInf & T
type PaginationResponseType<T> = {
  items: T[]
  paging: PagingDataInf
}
type PaginationWithResponse<T> = T & {
  paging: {
    page: number
    perPage: number
    totalPages: number
    totalCount: number
  }
}
type FormValueErrorsType<T> = Partial<Record<keyof T, string>>
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never
type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never
    }[keyof T]
  : ""
type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : ""
type ApiError = { message: any; meta: { param?: AnyObject } }
type BooleanString = "Y" | "N"
type TextType =
  | "LTitle"
  | "LSubtitle"
  | "MTitle"
  | "MSubtitle"
  | "SmTitle"
  | "SmSubtitle"
  | "XsTitle"
  | "XsCardTitle"
  | "XsSubtitle"
  | "XsHeader"
  | "ParagraphBold"
  | "Paragraph"
  | "Placeholder"
  | "HintBold"
  | "Hint"
type ButtonTextColor = string | "black" | "white"
type Primitive = string | number | symbol
type GenericObject = Record<Primitive, unknown>
type Join<L extends Primitive | undefined, R extends Primitive | undefined> = L extends
  | string
  | number
  ? R extends string | number
    ? `${L}.${R}`
    : L
  : R extends string | number
  ? R
  : undefined
type Union<L extends unknown | undefined, R extends unknown | undefined> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
  ? L
  : L | R
/**
 * NestedPaths
 * Get all the possible paths of an object
 * @example
 * type Keys = NestedPaths<{ a: { b: { c: string } }>
 * // 'a' | 'a.b' | 'a.b.c'
 */
type NestedPaths<
  T extends GenericObject,
  Prev extends Primitive | undefined = undefined,
  Path extends Primitive | undefined = undefined
> = {
  [K in keyof T]: T[K] extends Primitive
    ? Union<Union<Prev, Path>, Join<Path, K>>
    : NestedPaths<T[K], Union<Prev, Path>, Join<Path, K>>
}[keyof T]
/**
 * TypeFromPath
 * Get the type of the element specified by the path
 * @example
 * type TypeOfAB = TypeFromPath<{ a: { b: { c: string } }, 'a.b'>
 * // { c: string }
 */
type TypeFromPath<
  T extends GenericObject,
  Path extends string // Or, if you prefer, NestedPaths<T>
> = {
  [K in Path]: K extends keyof T
    ? T[K]
    : K extends `${infer P}.${infer S}`
    ? T[P] extends GenericObject
      ? TypeFromPath<T[P], S>
      : never
    : never
}[Path]

type IFormValueErrors<T extends any, K extends keyof T = keyof T> = T extends any[]
  ? IFormValueErrors<T[number]>[]
  : T extends any
  ? {
      [P in K]?: T[P] extends Primitive | undefined
        ? string
        : T extends any
        ? IFormValueErrors<T[P]>
        : never
    }
  : never

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>

type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends object ? KeysToCamelCase<T[K]> : T[K]
}

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S
type CamelToPascalCase<S extends string> = Capitalize<S>
type PascalToCamelCase<S extends string> = Uncapitalize<S>
type PascalToSnakeCase<S extends string> = CamelToSnakeCase<Uncapitalize<S>>
type SnakeToPascalCase<S extends string> = Capitalize<SnakeToCamelCase<S>>
type SnakeToCamelCaseNested<T> = T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]>
    }
  : T
