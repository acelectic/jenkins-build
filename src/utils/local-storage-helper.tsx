/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js"

enum EnumStoreKey {
  ACCESS_TOKEN,
  USER_ID,
  TENANT_ID,
  OAUTH_STATE,
}

export class LocalStorageHelper {
  static keys = EnumStoreKey
  static salt = process.env.REACT_APP_ENCRYPT_SALT || "encrypt-salt"

  static async setAccessToken(accessToken: string) {
    this.setEncryptValue(EnumStoreKey.ACCESS_TOKEN, accessToken)
  }

  static getAccessToken(): string {
    return this.getEncryptValue(EnumStoreKey.ACCESS_TOKEN)
  }

  static clearAccessToken() {
    localStorage.removeItem(`${EnumStoreKey.ACCESS_TOKEN}`)
  }

  static setEncryptValue(key: EnumStoreKey, value: any) {
    const encryptValue = this.encryptData(value, this.salt)
    localStorage.setItem(`${key}`, encryptValue)
  }

  static getEncryptValue(key: EnumStoreKey): string {
    const _value = localStorage.getItem(`${key}`)
    if (_value) {
      try {
        const decryptValue = this.decryptData(_value, this.salt)
        return decryptValue
      } catch (error) {
        console.debug(`getEncryptValue Error: ${error}`)
        return ""
      }
    } else {
      return ""
    }
  }

  static encryptData = (data: Record<string, any>, salt: string) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString()
  }

  static decryptData = (cipherText: string, salt: string) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, salt)
    try {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    } catch (err) {
      return null
    }
  }

  static clearStore = () => {
    localStorage.clear()
  }
}

export default LocalStorageHelper
