import { useCallback, useMemo, useState } from "react"
import {
  useCreateOneYearTemplate,
  useGetOneYearForEdit,
} from "../../../../services/set-form/set-form-query"
import { ISubmitCreateOneYearType } from "../../../../services/set-form/set-form-type"
import { useRouter } from "../../../../utils/helper"
import OneYearTemplateForm, {
  IOneYearTemplateFormType,
} from "../../CreateForm/OneYearTemplate/OneYearTemplateForm"

const OneYearTemplateCopy = () => {
  const { query } = useRouter<{ assessmentTemplateId: string }>()
  const {
    mutate: submitCopyOneYearTemplate,
    isLoading: isSubmitLoading,
  } = useCreateOneYearTemplate()

  const { data, isLoading } = useGetOneYearForEdit(query.assessmentTemplateId)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = useCallback(
    (values: ISubmitCreateOneYearType) => {
      submitCopyOneYearTemplate(values, {
        onSuccess: () => {
          setIsSuccess(true)
        },
      })
    },
    [submitCopyOneYearTemplate],
  )

  const initialValues: Partial<IOneYearTemplateFormType> = useMemo(() => {
    return {
      name: data?.name!,
      isActive: data?.isActive!,
      defaultMgr: data?.defaultMgr!,
      levelApprove: data?.levelApprove!,
      mgr1: data?.timelineForOneYear.mgr1!,
      mgr2: data?.timelineForOneYear.mgr2,
      mgr3: data?.timelineForOneYear.mgr3,
      mgr4: data?.timelineForOneYear.mgr4,
      feedback: data?.timelineForOneYear.feedback!,
      acceptGrade: data?.timelineForOneYear.acceptGrade!,
      descriptionForUser: data?.descriptionForUser!,
      descriptionForMgr: data?.descriptionForMgr!,
      jsonCalBehavior: {
        behaviorTemplateId: data?.calBehavior.behaviorTemplateId!,
        cal: data?.calBehavior.cal!,
      },
      scaleForGrade: {
        name: data?.scaleForGrade.name!,
        jsonScaleDetails: data?.scaleForGrade.jsonScaleDetails!,
      },
      companies: data?.companies,
      salaryAdminPlanIds: data?.salaryAdminPlanIds || undefined,
      employeeTypes: data?.employeeTypes || undefined,
      employeeClassificationIds: data?.employeeClassificationIds || undefined,
      positionLevelIds: data?.positionLevelIds || undefined,
      jobLevelIds: data?.jobLevelIds || undefined,
      jobCodeIds: data?.jobCodeIds || undefined,
    }
  }, [data])

  return (
    <>
      {!isLoading && (
        <OneYearTemplateForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          isSuccess={isSuccess}
          isSubmitLoading={isSubmitLoading}
        />
      )}
    </>
  )
}

export default OneYearTemplateCopy
