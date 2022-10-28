import { memo } from "react"
import { FormSpy } from "react-final-form"
import { useSelectHierarchyInitialFormValues } from "./helper"

const InitialSelectHierarchyGroupOptions = () => {
  const { fetchInitialValues } = useSelectHierarchyInitialFormValues()
  return (
    <FormSpy subscription={{ initialValues: true }}>
      {({ initialValues }) => {
        fetchInitialValues(initialValues)
        return <></>
      }}
    </FormSpy>
  )
}

export default memo(InitialSelectHierarchyGroupOptions)
