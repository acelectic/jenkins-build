import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import dayjs from "dayjs"
import humps from "humps"
import { customRequestData, deepLoop } from "./tools"
import { config } from "../../configs"
import LocalStorageHelper from "../local-storage-helper"
import { HeaderKeysMap } from "../helper"

const customHeadersForLocalDev = (request: AxiosRequestConfig): AxiosRequestConfig => {
  request.headers[HeaderKeysMap.xTenantId] = LocalStorageHelper.getEncryptValue(
    LocalStorageHelper.keys.TENANT_ID,
  )
  request.headers[HeaderKeysMap.xUserId] = LocalStorageHelper.getEncryptValue(
    LocalStorageHelper.keys.USER_ID,
  )
  return request
}

const createBackOfficeClient = () => {
  const ax = axios.create({
    baseURL: `${config.BACKOFFICE_SERVICE_API_URL}/api/v1`,
    // baseURL: "https://bo-api-pms-uat.cpall.co.th/api/v1",
    // baseURL: `http://bo-service-dev.moveplus.dynu.net/api/v1`,
    // baseURL: `http://localhost:9006/api/v1`,
    // baseURL: `http://localhost:9106/api/v1`,
  })
  ax.interceptors.request.use((request: AxiosRequestConfig) => {
    if (config.IS_LOCAL) {
      request = customHeadersForLocalDev(request)
    }

    const accessToken = LocalStorageHelper.getAccessToken()
    request.headers.Authorization = accessToken ? `Bearer ${accessToken}` : " "

    if (request.params) {
      request.params = deepLoop(request.params, modifyRequestData)
    }
    if (request.data) {
      request.data = deepLoop(request.data, modifyRequestData)
      customRequestData(request)
    }
    return request
  })
  ax.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      if (response.headers["content-type"].includes("application/json")) {
        response.data = humps.camelizeKeys(response.data)
      }
      return response
    },
    (error: any) => Promise.reject(error),
  )
  return ax
}

export const cpallPmsBackOfficeClient = createBackOfficeClient()

const modifyRequestData = (data: any) => {
  if (dayjs.isDayjs(data)) {
    return data.format()
  }
  return data
}

export const cpallPmsApiWrapper = async (method: Promise<AxiosResponse>) => {
  try {
    const res = await method
    return await Promise.resolve(res)
  } catch (e) {
    const { response, message }: any = e
    let { data } = response || {}
    if (data instanceof Blob) {
      const responseFromBlob = await data.text()
      data = JSON.parse(responseFromBlob || "")
    }
    const { message: errorMessage, errorCode, meta = {} } = data || {}
    return await Promise.reject({
      message: errorCode || errorMessage || message || e,
      meta: meta,
    })
  }
}
