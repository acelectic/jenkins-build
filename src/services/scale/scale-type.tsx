import { BaseEntity } from "../entity-typed"

export type OptionScaleResponse = {
  optionScale: OptionScaleType[]
}

export type OptionScaleType = {
  id: string
  name: string
}

export type ScaleResponse = {
  scale: Scale
}

export type ScaleDetail = BaseEntity & {
  value: number
  color: string
  scaleName: string
  description: string
}

export type Scale = BaseEntity & {
  name: string
  description: string | null
  scaleDetails: ScaleDetail[]
  positionTarget: string
}
