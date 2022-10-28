import dayjs from "dayjs"
import qs from "qs"
import { config } from "../configs"
import { encodeBase64 } from "./helper"
import LocalStorageHelper from "./local-storage-helper"

export interface EkoRefreshToken {
  accessToken: string
  expiresIn: number
  idToken: string
  refreshToken: string
  scope: string
  tokenType: string
}

export interface EkoUserInfo {
  id: string
  nid: string
  networkAdmin: boolean
  username: string
  firstname: string
  lastname: string
  email?: string
  avatar?: string
  position?: string
  coverPhoto?: string
  status?: string
  extras: Record<string, any>
}

export interface EkoError {
  code: number
  message: string
  name: string
  status: number
  statusCode: number
}

class EkoOAuth {
  static signIn() {
    const makeOauthParams = (clientId: string, redirectUri: string, state: string) => {
      return {
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: "openid profile",
        state,
      }
    }

    const oauthUrl = config.OAUTH_URL
    const state = EkoOAuth.makeStateCode()
    const oauthParams = makeOauthParams(config.OAUTH_CLIENT_ID, config.OAUTH_REDIRECT_URL, state)
    const backofficeOAuthUrl = `${oauthUrl}/oauth/authorize?${qs.stringify(oauthParams)}`
    window.open(backofficeOAuthUrl, "_self")
  }

  static makeStateCode() {
    const state = encodeBase64(`${dayjs().format()}`)
    LocalStorageHelper.setEncryptValue(LocalStorageHelper.keys.OAUTH_STATE, state)
    return state
  }

  static checkStateCode(state: string) {
    const stateInStore = LocalStorageHelper.getEncryptValue(LocalStorageHelper.keys.OAUTH_STATE)
    return state === stateInStore
  }
}

export default EkoOAuth
