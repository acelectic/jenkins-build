import { BaseEntity } from "../entity-typed"
import { Paging } from "../role/role-type"

export type KpiLibraryType = BaseEntity & {
  name: string
  description: string
  category: string
}

export type KpiLibraryResponse = {
  kpiLibraries: KpiLibraryType[]
  paging: Paging
}

export type CategoryOptionsResponse = {
  optionsCategory: string[]
}

export type CreateKpiLibraryParams = {
  name: string
  description: string
  category: string
  id?: string
}

export type CreateKpiLibraryResponse = {
  kpiLibrary: CreateKpiLibraryParams
}

export enum KpiLibraryOrder {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  CATEGORY_ASC = "category_asc",
  CATEGORY_DESC = "category_desc",
  CREATED_AT_ASC = "created_at_asc",
  CREATED_AT_DESC = "created_at_desc",
}

export type GetKpiLibrary = {
  meta: {
    perPage: number
    page?: number
    orderBy?: KpiLibraryOrder
  }
}
