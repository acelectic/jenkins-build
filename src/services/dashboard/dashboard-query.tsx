import { useQuery } from "react-query"
import { api } from "../../utils/api"
import { IDashboardResponse } from "./dashboard-types"

export const DASHBOARDS = "dashboards"

export const useGetDashboards = () => {
  return useQuery(
    [DASHBOARDS],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<IDashboardResponse>(`${DASHBOARDS}`)
      return data
    },
    {
      onError: () => {},
    },
  )
}
