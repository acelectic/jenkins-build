import { useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../../utils/api"
import { useSnackbar } from "../../utils/custom-hook"
import { IQuotaGradeResponseType, IUpdateQuotaGradeParams } from "./quota-grade-type"

const QUOTA_GRADES = "quota-grades"

export const useQuotaGrade = () => {
  return useQuery([QUOTA_GRADES], async () => {
    const { data } = await api.cpallPmsBackOffice.get<IQuotaGradeResponseType>(`${QUOTA_GRADES}`)
    return data
  })
}

export const useUpdateQuotaGrade = (id: string) => {
  const { snackbar } = useSnackbar()
  const queryClient = useQueryClient()
  return useMutation(
    async (params: IUpdateQuotaGradeParams) => {
      const { data } = await api.cpallPmsBackOffice.put<any>(`${QUOTA_GRADES}/${id}`, params)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUOTA_GRADES])
        snackbar({ message: "Success", type: "success" })
      },
      // onError: (error) => {
      //   snackbar({ message: "Error", type: "error" })
      // },
    },
  )
}
