import { useCallback, useMemo, useState } from "react"
import { useCreateOneYearTemplate } from "../../../../services/set-form/set-form-query"
import { ISubmitCreateOneYearType } from "../../../../services/set-form/set-form-type"

import OneYearTemplateForm from "./OneYearTemplateForm"

const OneYearTemplateCreate = () => {
  const { mutate: submitCreateOneYearTemplate, isLoading } = useCreateOneYearTemplate()
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = useCallback(
    (values: ISubmitCreateOneYearType) => {
      submitCreateOneYearTemplate(values, {
        onSuccess: () => {
          setIsSuccess(true)
        },
      })
    },
    [submitCreateOneYearTemplate],
  )

  const initialValues = useMemo(() => {
    return {
      isActive: true,
    }
  }, [])

  return (
    <OneYearTemplateForm
      onSubmit={onSubmit}
      isSuccess={isSuccess}
      isSubmitLoading={isLoading}
      initialValues={initialValues}
    />
  )
}

export default OneYearTemplateCreate
