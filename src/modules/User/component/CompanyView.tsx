import { useMemo } from "react"
import HierarchyView from "../../../components/HierarchyView"
import { OrganizationDetailsResponse } from "../../../services/user/user-type"

type CompanyViewProps = {
  data?: OrganizationDetailsResponse
}

const CompanyView = (props: CompanyViewProps) => {
  const { data } = props
  const _items = useMemo(() => {
    return {
      companies: data?.companies,
      jobFunctions: data?.jobFunctions,
      divisions: data?.divisions,
      departments: data?.departments,
      stores: data?.stores,

      jobLevels: data?.jobLevels,
      jobCodes: data?.jobCodes,
      salaryAdminPlans: data?.salaryAdminPlans,
      employeeTypes: data?.employeeTypes,
      employeeClassifications: data?.employeeClassifications,
      positionLevels: data?.positionLevels,
    }
  }, [
    data?.companies,
    data?.departments,
    data?.divisions,
    data?.employeeClassifications,
    data?.employeeTypes,
    data?.jobCodes,
    data?.jobFunctions,
    data?.jobLevels,
    data?.positionLevels,
    data?.salaryAdminPlans,
    data?.stores,
  ])
  return <HierarchyView items={_items} />
}

export default CompanyView
