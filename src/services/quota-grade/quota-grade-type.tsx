import { BaseEntity } from "../entity-typed"

export type IGrade = {
  grade: number
  quota: number
}

export type IQuotaGradeType = BaseEntity & {
  isCalibrated: boolean
  grades: IGrade[]
  isLocked: boolean
  name: string
}

export type IQuotaGradeResponseType = {
  quotaGrades: IQuotaGradeType[]
}

export type IUpdateQuotaGradeParams = {
  isCalibrated?: boolean
  grades?: IGrade[]
  isLocked?: boolean
}
