import { isEqual } from "lodash"
import { Context, createContext, useCallback, useMemo, useRef, useState } from "react"
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router"
import qs from "qs"
import { AnyObject } from "final-form"
import FileType from "file-type/browser"
import { AxiosResponse } from "axios"
import deepmerge from "deepmerge"
import downloadjs from "downloadjs"
import dayjs, { Dayjs } from "dayjs"
import { CalibrationState, FormType } from "../services/enum-typed"

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const createCtx = <T extends object>(initValue: T) => {
  return createContext<
    [T, (value: DeepPartial<T>) => void, { reset: () => void; initialValue: T }]
  >([
    initValue,
    (value: DeepPartial<T>) => {},
    {
      reset: () => {},
      initialValue: initValue,
    },
  ])
}

const overwriteMerge = (destinationArray: any, sourceArray: any, options: any) => sourceArray

export const withCtx = <T extends AnyObject = AnyObject>(Context: Context<any>) => (
  Component: React.ElementType,
) => (props: T) => {
  const initalState = useMemo(() => {
    return (Context as any)._currentValue[0] || {}
  }, [])

  const [state, setState] = useState(initalState)
  const ref = useRef(state)

  const customSetState = useCallback((v: any) => {
    const newState = deepmerge(ref.current, v, { arrayMerge: overwriteMerge })
    if (!isEqual(newState, ref.current)) {
      ref.current = newState
      setState(newState)
    }
  }, [])

  const reset = useCallback(() => {
    if (!isEqual(initalState, ref.current)) {
      ref.current = initalState
      setState(initalState)
    }
  }, [initalState])

  return (
    <Context.Provider value={[state, customSetState, { reset, initialValue: initalState }]}>
      <Component {...props} />
    </Context.Provider>
  )
}

export const useRouter = <TQuery extends any = any>() => {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const query = useMemo(() => {
    return {
      ...qs.parse(location.search.slice(1)),
      ...params,
    } as TQuery
  }, [location.search, params])

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      goBack: history.goBack,
      pathname: location.pathname,
      query,
      match,
      location,
    }
  }, [history.push, history.replace, history.goBack, location, query, match])
}

export const useQueryParams = <T extends object>() => {
  const router = useRouter()
  const setParam = useCallback(
    (value: T) => {
      router.push(`${router.pathname}?${qs.stringify({ ...router.query, ...value })}`)
    },
    [router],
  )
  return {
    query: router.query as T,
    setParam,
  }
}

export const blobToFile = async (res: AxiosResponse<Blob>) => {
  const type = await FileType.fromBlob(res.data)
  const filename = res.headers["content-disposition"].split("filename=")[1].replace(/"/g, "")
  return new File([res.data.slice(0, -1)], `${filename}.${type?.ext || ""}`, {
    type: type?.mime,
  })
}

export const openFileOrDownload = async (res: AxiosResponse<Blob>) => {
  const type = await FileType.fromBlob(res.data)
  const filename = res.headers["content-disposition"].split("filename=")[1].replace(/"/g, "")
  if (type && (type.mime.includes("application/pdf") || type.mime.includes("image/"))) {
    const url = window.URL.createObjectURL(
      new File([res.data.slice(0, -1)], `filename.${type.ext}`, {
        type: type.mime,
      }),
    )
    const newTab = window.open()
    if (newTab) {
      newTab.location.href = url
    }
  } else {
    downloadjs(res.data, decodeURIComponent(filename))
  }
}

export const downloadFile = async (res: AxiosResponse<Blob>) => {
  const filename = res.headers["content-disposition"].split("filename=")[1].replace(/"/g, "")
  downloadjs(res.data, decodeURIComponent(filename))
}

const defaultMode = ["production", "uat", "staging", "development"] as const

export const isMode = (...mode: typeof defaultMode[number][]) => {
  const buildMode = process.env.REACT_APP_MODE as typeof defaultMode[number]
  return mode.includes(buildMode)
}

export const isModeDown = (mode: typeof defaultMode[number]) => {
  const allowMode = defaultMode.slice(defaultMode.indexOf(mode))
  const buildMode = process.env.REACT_APP_MODE as typeof defaultMode[number]
  return allowMode.includes(buildMode)
}

export const validateRequired = <T extends AnyObject, K extends (keyof T)[] = (keyof T)[]>(
  values: T,
  specificKeys: K,
) => {
  const errors: Partial<Record<keyof T, string>> = {}
  specificKeys.forEach((k) => {
    if (!values[k]) {
      errors[k] = "Required"
    }
  })
  return errors
}

export const convertStringToBoolean = (value: any) => {
  if (value === "Y") {
    return true
  } else if (value === "N") {
    return false
  }
  return false
}

export const HeaderKeysMap = {
  xTenantId: "x-tenant-id",
  xUserId: "x-user-id",
  xOAuthAccessToken: "x-oauth-access-token",
  xOAuthExpiredAt: "x-oauth-expired-at",
} as const

export const encodeBase64 = (value: string) => {
  return Buffer.from(value).toString("base64")
}

export const normalizeNumber = (value: any) => {
  if (!value) return value
  const onlyNumber = value.replace(/[^\d]/g, "")
  if (onlyNumber.length > 1 && isNaN(Number(onlyNumber))) {
    return ""
  }
  return onlyNumber
}

export const normalizeEnter = (value: any) => {
  if (!value) return value
  const onlyValue = value.replace(/[\n]/g, "")
  return onlyValue
}

export const removeDecimalWhenZero = (value: string) => {
  const lastThreeChar = value.slice(-3)
  // console.debug("3 digit ", lastThreeChar)
  if (lastThreeChar === ".00") {
    const noDecimal = value.substring(0, value.length - 3)
    // console.debug('noDecimal', noDecimal)
    return noDecimal
  }
  return value
}

export const normalizeDate = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY")
}

export const normalizeDateTH = (date: string | Dayjs) => {
  return dayjs(date).locale("th").format("DD MMM YYYY")
}

export const normalizeDateAndTimeTh = (date: string) => {
  return dayjs(date).locale("th").format("DD MMM YYYY H:mm น")
}

export const normalizeYear = (value: any) => {
  if (!value) return value
  value = value.toString()

  let onlyNumber = value.replace(/[^\d.-]/g, "")
  if (onlyNumber.length === 1) {
    if (onlyNumber.includes("0")) {
      onlyNumber = onlyNumber.replace("0", "")
    }
  }
  return onlyNumber
}

export const normalizeNumberWith2Digit = (value: any) => {
  if (!value) return value
  value = value.toString()

  // const regex = /^-?\d+(?:\.\d+)?$/gm
  let onlyNumber = value.replace(/[^\d.-]/g, "")
  if (onlyNumber.includes("-")) {
    onlyNumber = onlyNumber.replace("-", "")
  }
  if (onlyNumber.includes("..")) {
    onlyNumber = onlyNumber.replace("..", ".")
  }
  if (onlyNumber.includes("--")) {
    onlyNumber = onlyNumber.replace("--", "-")
  }
  if (onlyNumber.includes("-.")) {
    onlyNumber = onlyNumber.replace("-.", "-0.")
  }
  if (onlyNumber.includes(".-")) {
    onlyNumber = onlyNumber.replace(".-", ".")
  }
  if (onlyNumber.length > 1 && onlyNumber.slice(-1) === "-") {
    onlyNumber = onlyNumber.slice(0, -1) // remove last char
  }

  const temp = onlyNumber.slice(0, -1).indexOf(".")
  if (temp !== -1 && onlyNumber.slice(-1) === ".") {
    onlyNumber = onlyNumber.slice(0, -1) // remove last char
  }
  const indexOfDot = onlyNumber.indexOf(".")
  let result = ""
  if (indexOfDot !== -1) {
    if (indexOfDot === 10) {
      result = onlyNumber.substring(0, 13)
    } else if (onlyNumber.length < 13) {
      result =
        onlyNumber.substring(0, indexOfDot) + onlyNumber.substring(indexOfDot, indexOfDot + 3)
    } else {
      result = onlyNumber.substring(0, 10) + onlyNumber.substring(indexOfDot, indexOfDot + 3)
    }
  } else {
    if (onlyNumber.length >= 10) {
      result = onlyNumber.substring(0, 10)
    } else {
      result = onlyNumber
    }
  }

  let v = ""
  if (result !== "-") {
    v =
      indexOfDot !== -1
        ? Number(result.substring(0, result.indexOf("."))).toLocaleString() +
          result.substring(result.indexOf("."), result.length)
        : Number(result).toLocaleString()
  } else {
    v = result
  }
  return v
}

export const parseRemoveComma = (limitLength = 10) => (value: any) => {
  return `${value}`.replace(/[^\d .-]/g, "").substring(0, limitLength)
}

/**
 * @param {number} value
 * @param {number} [limit=0] default 0
 */
export const format2DecimalNumber = (value: number, limit: number = 0) => {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: limit,
  })
}

export const getTitleFormat = (props: {
  year?: string
  quarter?: string
  formType?: FormType
  startDate?: string
  endDate?: string
  shortTitle?: boolean
}): string => {
  const { year, quarter, formType, startDate, endDate, shortTitle } = props
  const startDateDayJs = dayjs(startDate)
  const endDateDayJs = dayjs(endDate)

  switch (formType) {
    case FormType.HALF_YEAR:
    case FormType.OTHER:
      if (shortTitle) {
        return `${year}`
      } else {
        return `${year}/ ${startDateDayJs.format("D MMMM")} - ${endDateDayJs.format("D MMMM")}`
      }
    case FormType.YEAR:
      return `${year}`
    case FormType.QUARTER:
      return `${year}/${quarter}`
    default:
      return "-"
  }
}

export const getCalibrationStateTitle = (calibrationState: string) => {
  switch (calibrationState) {
    case CalibrationState.CALIBRATING:
      return "กำลังปรับเทียบผลงาน"
    case CalibrationState.WAITING:
      return "รอปรับเทียบผลงาน"
    case CalibrationState.PENDING:
      return "รอตรวจสอบ"
    case CalibrationState.COMPLETE:
      return "เสร็จสิ้นแล้ว"
    default:
      return "-"
  }
}

export const setTimeoutInValidateQueryAggregate = (callback: () => void, delay = 3 * 1000) => {
  setTimeout(callback, delay)
  setTimeout(callback, 10 * 1000)
}
