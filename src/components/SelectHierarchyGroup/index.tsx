/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "@emotion/styled"
import { Box } from "@mui/system"
import SelectEmployeeGroupComponent from "./SelectEmployeeGroupComponent"
import SelectHierarchyGroupComponent from "./SelectHierarchyGroupComponent"

const Layout = styled(Box)``

export enum EnumSelectHierarchyGroupType {
  EMPLOYEE = "employee",
  HIERARCHY = "hierarchy",
}

type ISelectHierarchyGroupProps = {
  type?: EnumSelectHierarchyGroupType
  isRequireKpiTransaction?: boolean
  hideCountUsers?: boolean
}

const SelectHierarchyGroup = (props: ISelectHierarchyGroupProps) => {
  const {
    type = EnumSelectHierarchyGroupType.HIERARCHY,
    isRequireKpiTransaction = false,
    hideCountUsers = false,
  } = props

  return (
    <Layout>
      {type === EnumSelectHierarchyGroupType.HIERARCHY ? (
        <SelectHierarchyGroupComponent hideCountUsers={hideCountUsers} />
      ) : (
        <SelectEmployeeGroupComponent
          scopeUserIds={[]}
          isRequireKpiTransaction={isRequireKpiTransaction}
        />
      )}
    </Layout>
  )
}

export default SelectHierarchyGroup
