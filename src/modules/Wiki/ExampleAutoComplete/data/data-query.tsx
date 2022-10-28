import { useMutation } from "react-query"
import { GetColorsParams } from "./data-type"

export const useGetAsyncOpitions = <
  T extends BaseOptionType = BaseOptionType
>() => {
  const mutate = useMutation(async (params: GetColorsParams) => {
    const { q } = params
    if (!q) return await Promise.resolve([])
    const data = await [
      { label: "red", value: "red" },
      { label: "yellow", value: "yellow" },
      { label: "blue", value: "blue" },
      { label: "green", value: "green" },
      { label: "orange", value: "orange" },
    ]
    const options = data.map((item) => {
      return { label: `${item.label}`, value: item.value } as T
    })
    return options
  })
  return mutate
}
