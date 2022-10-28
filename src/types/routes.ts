import React from "react"
import { PERMISSIONS } from "../services/enum-typed"

export type RouteType = {
  id: string
  path: string
  icon?: JSX.Element
  head?: string
  children: null | Array<RouteChildType>
  component: React.ComponentClass<any> | null
  badge?: string | number
  containsHome?: boolean
  open?: boolean
  header?: string
  guard?: React.ComponentClass<any>
  permissions?: PERMISSIONS[]
}

export type RouteChildType = {
  path: string
  name: string
  component: React.ComponentClass<any>
  icon?: JSX.Element
  badge?: string | number
  guard?: React.ComponentClass<any>
  hidden?: boolean
  permissions?: PERMISSIONS[]
}
