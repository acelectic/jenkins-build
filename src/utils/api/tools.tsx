import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig, CancelTokenSource } from "axios"
import qs from "qs"

export enum EnumContentType {
  XFORM = "application/x-www-form-urlencoded",
  JSON = "application/json",
  FORMDATA = "multipart/form-data",
}

interface IRequestConfig extends AxiosRequestConfig {
  contentType?: EnumContentType
}

const customClientWithData = <T extends unknown>(
  url: string,
  method: AxiosInstance["put"] | AxiosInstance["post"] | AxiosInstance["patch"],
  data: T,
  option?: IRequestConfig,
) => {
  const { contentType = EnumContentType.JSON, ...restOption } = option || {}
  return method(url, data, {
    headers: {
      "Content-Type": contentType,
    },
    ...restOption,
  })
}

const customClient = (
  url: string,
  method: AxiosInstance["delete"] | AxiosInstance["get"],
  params: any,
  option?: AxiosRequestConfig & { contentType?: EnumContentType },
) => {
  const { contentType = EnumContentType.JSON, ...restOption } = option || {}
  return method(url, {
    params,
    headers: {
      "Content-Type": contentType,
    },
    ...restOption,
  })
}

export type IResponseData<T> = Promise<AxiosResponse<T>>

export const createMethod = (
  client: AxiosInstance,
  apiWrapper: (method: Promise<AxiosResponse>) => Promise<any>,
) => ({
  get: <T extends unknown>(
    url: string,
    param?: unknown,
    option?: IRequestConfig,
  ): IResponseData<T> => apiWrapper(customClient(url, client.get, param, option)),
  put: <T extends unknown>(
    url: string,
    data?: unknown,
    option?: IRequestConfig,
  ): IResponseData<T> => apiWrapper(customClientWithData(url, client.put, data, option)),
  post: <T extends unknown>(
    url: string,
    data?: unknown,
    option?: IRequestConfig,
  ): IResponseData<T> => apiWrapper(customClientWithData(url, client.post, data, option)),
  patch: <T extends unknown>(
    url: string,
    data?: unknown,
    option?: IRequestConfig,
  ): IResponseData<T> => apiWrapper(customClientWithData(url, client.patch, data, option)),
  delete: <T extends unknown>(
    url: string,
    param?: unknown,
    option?: IRequestConfig,
  ): IResponseData<T> => apiWrapper(customClient(url, client.delete, param, option)),
  getFile: <T extends Blob>(
    url: string,
    param?: unknown,
    option?: AxiosRequestConfig & { contentType?: EnumContentType },
  ): IResponseData<T> =>
    apiWrapper(customClient(url, client.get, param, { responseType: "blob", ...option })),
})

export const customRequestData = (request: any) => {
  if (request.headers["Content-Type"] === EnumContentType.FORMDATA) {
    if (request.data) {
      const formData = new FormData()
      Object.entries(request.data).forEach(([key, value]: any[]) => {
        if (value instanceof Array) {
          value.forEach((val) => {
            formData.append(`${key}`, val)
          })
        } else {
          formData.append(key, value)
        }
      })
      // console.debug(formData.get('files')?.toString())
      request.data = formData
    }
  } else if (request.headers["Content-Type"] === EnumContentType.XFORM) {
    if (request.data) {
      request.data = qs.stringify(request.data)
    }
  } else if (request.headers["Content-Type"] === EnumContentType.JSON) {
    // do noting
  }
}

export const deepLoop = (data: any, func: (data: any) => any): any => {
  if (data instanceof File) {
    return func(data)
  }
  if (data instanceof Array) {
    return data.map((d) => deepLoop(d, func))
  }
  if (data instanceof Object) {
    const formatData: any = {}
    Object.keys(data).forEach((key) => {
      formatData[key] = deepLoop(data[key], func)
    })
    return formatData
  }
  return func(data)
}

export class AxiosCancelRequestHelper {
  private _cancelToken: CancelTokenSource = axios.CancelToken.source()

  get cancelToken() {
    return this._cancelToken
  }

  set cancelToken(newCancelToken: CancelTokenSource) {
    this._cancelToken = newCancelToken
  }

  onRequest() {
    if (this.cancelToken?.token) {
      this.cancelToken.cancel()
    }
    this.cancelToken = axios.CancelToken.source()
  }

  cancelRequest() {
    this.cancelToken?.cancel()
  }
}
