import styled from "@emotion/styled"
import { GRAYSCALE_LIGHTGRAY_10 } from "../constants/colors"
import { ISelectHierarchyGroupFormValues } from "./SelectHierarchyGroup/interface"
import SelectHierarchyGroupResult from "./SelectHierarchyGroup/SelectHierarchyGroupResult"

const SelectedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${GRAYSCALE_LIGHTGRAY_10};
  border-radius: 8px;
  width: 100%;
`

export type IHierarchyFormValuesViewProps = {
  items: Partial<ISelectHierarchyGroupFormValues>
}

const HierarchyFormValuesView = (props: IHierarchyFormValuesViewProps) => {
  return (
    <SelectedContainer>
      <SelectHierarchyGroupResult isHideHeader isActionDisabled />
    </SelectedContainer>
  )
}

export default HierarchyFormValuesView
