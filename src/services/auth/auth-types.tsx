import { EkoRefreshToken, EkoUserInfo } from "../../utils/eko-oauth"
import { User } from "../entity-typed"

export type SignInParams = {
  code: string
  debug?: boolean
  employeeId?: string
}

export type UserResponse = {
  user: User & {
    accessToken: string
    directManager1: User | null
    directManager2: User | null
    defaultManager: User | null
  }
  oauthUserInfo?: EkoUserInfo
  oauthRefreshToken?: EkoRefreshToken
}
