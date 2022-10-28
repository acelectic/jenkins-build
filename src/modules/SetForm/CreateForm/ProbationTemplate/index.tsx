import { useCallback, useMemo, useState } from "react"
import { useCreateProbationTemplate } from "../../../../services/set-form/set-form-query"
import { ISubmitCreateProbationType } from "../../../../services/set-form/set-form-type"
import ProbationTemplateForm from "./ProbationTemplateForm"

const ProbationTemplateCreate = () => {
  const { mutate: submitCreateProbationTemplate, isLoading } = useCreateProbationTemplate()
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = useCallback(
    (values: ISubmitCreateProbationType) => {
      submitCreateProbationTemplate(values, {
        onSuccess: () => {
          setIsSuccess(true)
        },
      })
    },
    [submitCreateProbationTemplate],
  )
  const initialValues = useMemo(() => {
    return {
      isActive: true,
      mgr_seq: 1,
    }
  }, [])

  return (
    <ProbationTemplateForm
      onSubmit={onSubmit}
      isSuccess={isSuccess}
      isSubmitLoading={isLoading}
      initialValues={initialValues}
    />
  )
}

export default ProbationTemplateCreate
