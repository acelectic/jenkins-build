import { isEqual, set, get } from "lodash"
// const makeNormalize = (func: (value: any, prevValue: any) => any) => {
//   return (value: any) => {
//     if (!value) return value;
//     const prevValue = value.slice(0, value.length - 1);
//     return func(value, prevValue);
//   };
// };

export const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const createValidation = <T extends unknown>(
  obj: (values: T) => { [key in keyof Partial<T>]: (val: any) => string | undefined },
) => {
  return (values: any) =>
    Object.entries(obj(values)).reduce((r, [key, schema]: any) => {
      set(r, key, schema(get(values, key)))
      // r[key] = schema(values[key])
      return r
    }, {} as any)
}

export const cp = (...funcs: ((val: any) => string | undefined)[]) => (
  value: any,
): string | undefined => {
  for (let func of funcs) {
    const message = func(value)
    if (message) {
      return message
    }
  }
  return undefined
}

// funcs.reduce(
//   (c, func) => (...args: any[]) => c(func(...args)),
//   (...arg: any[]) => arg
// );
export const minLength = (min: number, errorMessage: string) => (val: any) => {
  if (!val) return undefined
  return val && val.length < min ? errorMessage : undefined
}

export const maxLength = (max: number, errorMessage: string) => (val: any) => {
  if (!val) return undefined
  return val && val.length > max ? errorMessage : undefined
}

export const number = (errorMessage: string) => (val: any) => {
  if (!val) return undefined
  return /^\d+$/.test(val) ? undefined : errorMessage
}

export const numberWithDecimal = (errorMessage: string) => (val: any) => {
  if (!val) return undefined
  return /^\d+(?:\.\d+)?$/.test(val) ? undefined : errorMessage
}

export const numberNotNegative = (errorMessage: string) => (val: any) => {
  console.debug(typeof val, "val type")
  if (!val) return undefined
  return typeof val === "number" && val >= 0 ? undefined : errorMessage
}

export const required = (errorMessage: string) => (val: any) => {
  return val ? undefined : errorMessage
}

export const when = (
  validateFunc: (val: any) => boolean,
  funcs: (val: any) => string | undefined,
) => (val: any) => {
  return validateFunc(val) ? funcs(val) : undefined
}

export const latitude = (errorMessage: string) => (val: any) => {
  if (!val) return undefined
  return /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(val)
    ? undefined
    : errorMessage
}

export const longitude = (errorMessage: string) => (val: any) => {
  if (!val) return undefined
  return /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(
    val,
  )
    ? undefined
    : errorMessage
}

export const email = (errorMesage: string) => (val: any) => {
  // eslint-disable-next-line no-control-regex
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    val,
  )
    ? undefined
    : errorMesage
}

export const equal = (value: any, errorMesage: string) => (val: any) => {
  return isEqual(val, value) ? undefined : errorMesage
}
