import {
  JsonScaleKpiTransactionDetail,
  KpiLibraryWithCategory,
  KpiTransaction,
  KpiTransactionDetail,
  Paging,
} from "../entity-typed"
import { KpiStatus, KpiType, UnitType } from "../enum-typed"
import { IGetHierarchyOption } from "../group-employee/group-employee-type"

export type CreateKpiTransactionDetails = {
  transactionDetails: KpiTransactionDetailCreateParam[]
}

export type KpiTransactionDetailCreateParam = {
  weight: number
  name: string
  description: string
  goalCategory: string
  actual: number
  // startDate: string
  // endDate: string
  unitType: UnitType
  customUnitType: string
  scoreType: string
  jsonScale: JsonScaleKpiTransactionDetail
  assignableId: string
  kpiType: KpiType
  kpiTransactionId: string
  target: number
}

export type KpiTransactionForm = Partial<KpiTransactionDetail>

export type ManagerKpiParams = {
  kpiTransactionDetails: {
    isSelected: boolean
    params?: {
      isActiveTemplate?: boolean
      page?: number
      limit?: number
      orderBy?: string
      q?: string
    }
  }
  kpiTransactionDetail: {
    isSelected: boolean
    params?: {
      kpiTransactionDetailId?: string
    }
  }
  kpiTransactionDetailUsers: {
    isSelected: boolean
    params?: {
      kpiTransactionDetailId?: string
      page?: number
      limit?: number
      q?: string
    }
  }
  oldKpiTransactions: {
    isSelected: boolean
    params?: {}
  }
  kpiLibrary: {
    isSelected: boolean
    params?: {
      page?: number
      limit?: number
      orderBy?: string
    }
  }
  structureOptions: {
    isSelected: boolean
    params?: {
      company?: {
        isSelected?: boolean
      }
    }
  }
  userByHierarchy: {
    isSelected: boolean
    params?: {
      endDate?: string
      page?: number
      limit?: number
    }
  }
  options: {
    isSelected: boolean
  }
}

export type ManageKpiResponse = {
  kpiTransactionDetails: KpiTransactionDetailResponse
  kpiLibrary: KpiLibraryWithCategory[]
  kpiTransactionDetail: KpiTransactionDetailData
  oldKpiTransactions: OldKpiTransactionResponse[]
  kpiTransactionDetailUsers: {
    paging: Paging
    data: IKpiTransactionDetailUserResponse[]
  }
  options: OptionsResponse
}

export type KpiTransactionDetailResponse = {
  paging: Paging
  data: KpiTransactionDetailData[]
}

export type KpiTransactionDetailData = {
  actual: string
  customUnitType: string
  description: string
  id: string
  kpiTransactionCount: string
  kpiType: string
  name: string
  scoreType: string
  target: string
  unitType: string
  weight: string
  goalCategory: string
  kpiTransactions: {
    id: string
    userId: string
    kpiStatus: KpiStatus
  }[]
  jsonScale: JsonScaleKpiTransactionDetail
}

export type OldKpiTransactionResponse = {
  year: string
  kpiTransaction: KpiTransaction
}

export type SubmitKpiTransactionDetail = {
  weight: number
  name: string
  description: string
  goalCategory: string
  actual?: number
  unitType: UnitType
  customUnitType: string
  scoreType: string
  jsonScale: JsonScaleKpiTransactionDetail
  assignableId: string
  kpiType: KpiType
  kpiTransactionId?: string
  target: number
}

export type OptionsResponse = {
  units: string[]
  categoryTypes: string[]
}

export type ISubmitUpdateKpiTransactionDetail = {
  kpiTransactionIds?: string[]
  userSelected?: IGetHierarchyOption
  assignmentType: string
  kpiTransactionDetailBody: SubmitKpiTransactionDetail
  actual?: number
}

export type ISubmitCreateKpiTransactionDetail = {
  kpiTransactionIds?: string[]
  userSelected?: IGetHierarchyOption
  transactionDetails: SubmitKpiTransactionDetail[]
  actual?: number
}

export type IKpiTransactionDetailUserResponse = {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  prefix: string
}
