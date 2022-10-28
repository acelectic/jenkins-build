import { useQuery } from "react-query"
import { api } from "../../utils/api"
import { IReportResponse } from "./report-types"

export const REPORTS = "reports"

export const useGetReports = () => {
  return useQuery([REPORTS], async () => {
    const { data } = await api.cpallPmsBackOffice.get<IReportResponse>(`${REPORTS}`)
    return data
  })
}
