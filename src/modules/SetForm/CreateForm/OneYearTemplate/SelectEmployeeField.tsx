import { Dispatch, useCallback } from "react"
import { TemplateCreateState } from "../../../../services/enum-typed"
import ChooseSelectGroupComponent from "../../../../components/fields/ChooseSelectGroupComponent"

type ISelectEmployeeFieldProps = {
  setCurrentState: Dispatch<React.SetStateAction<TemplateCreateState>>
}

const SelectEmployeeField = (props: ISelectEmployeeFieldProps) => {
  const { setCurrentState } = props

  const onBackClick = useCallback(() => {
    setCurrentState(TemplateCreateState.SET_TARGET)
  }, [setCurrentState])

  const onSubmit = useCallback(() => {
    setCurrentState(TemplateCreateState.CONFIRM_TEMPLATE)
  }, [setCurrentState])

  return (
    <ChooseSelectGroupComponent
      onNextClick={onSubmit}
      onBackClick={onBackClick}
      isOnlySelectHierarchy
      hideCountUsers
      buttonText={"ไปตรวจสอบแบบฟอร์ม"}
    />
  )
}

export default SelectEmployeeField
