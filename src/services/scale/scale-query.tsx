import { useQuery } from "react-query"
import { api } from "../../utils/api"
import { OptionScaleResponse, ScaleResponse } from "./scale-type"

const SCALE = `/scales`
const OPTION_SCALE = `${SCALE}/option-scales`

export const useGetScaleById = (id: string) => {
  return useQuery([SCALE, id], () => {
    return api.cpallPmsBackOffice.get<ScaleResponse>(`${OPTION_SCALE}`, { id })
  })
}

export const useGetOptionScale = () => {
  return useQuery([OPTION_SCALE], async () => {
    const { data } = await api.cpallPmsBackOffice.get<OptionScaleResponse>(
      `${OPTION_SCALE}`
    )

    return (
      data?.optionScale.map((scale): {
        label: string
        value: string | number
      } => {
        const { id, name } = scale
        return {
          label: name,
          value: id,
        }
      }) || []
    )
  })
}
