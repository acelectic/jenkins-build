/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/padding-line-between-statements */
declare global {
  interface Window {
    _env_: any
  }
}

/**
 * wenv from chart
 * process.env from .env from chart
 */
const wenv = window?._env_ ?? {}
const getEnvValue = (key: string) => wenv[key] || process.env[key]

export const config = {
  BACKOFFICE_SERVICE_API_URL: getEnvValue("REACT_APP_BACKOFFICE_SERVICE_API_URL"),
  OAUTH_URL: getEnvValue("REACT_APP_OAUTH_URL"),
  OAUTH_CLIENT_ID: getEnvValue("REACT_APP_OAUTH_CLIENT_ID"),
  OAUTH_CLIENT_SECRET: getEnvValue("REACT_APP_OAUTH_CLIENT_SECRET"),
  OAUTH_REDIRECT_URL: getEnvValue("REACT_APP_OAUTH_REDIRECT_URL"),
  IS_LOCAL: process.env.REACT_APP_IS_LOCAL === "true",
  EKO_HOST: getEnvValue("REACT_APP_EKO_HOST"),
  EKO_CLIENT_ID: getEnvValue("REACT_APP_EKO_CLIENT_ID"),
  REACT_APP_DEBUG_MODE: getEnvValue("REACT_APP_DEBUG_MODE") === "true",
}
