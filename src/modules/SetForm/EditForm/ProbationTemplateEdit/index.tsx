import { useCallback, useMemo, useState } from "react"
import {
  useUpdateProbationTemplate,
  useGetProbationForEdit,
} from "../../../../services/set-form/set-form-query"
import { ISubmitCreateProbationType } from "../../../../services/set-form/set-form-type"
import { useRouter } from "../../../../utils/helper"
import ProbationTemplateForm, {
  IProbationTemplateFormType,
} from "../../CreateForm/ProbationTemplate/ProbationTemplateForm"

const ProbationTemplateEdit = () => {
  const { query } = useRouter<{ assessmentTemplateId: string }>()
  const {
    mutate: submitUpdateProbationTemplate,
    isLoading: isSubmitLoading,
  } = useUpdateProbationTemplate(query.assessmentTemplateId)

  const { data, isLoading } = useGetProbationForEdit(query.assessmentTemplateId)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = useCallback(
    (values: ISubmitCreateProbationType) => {
      submitUpdateProbationTemplate(values, {
        onSuccess: () => {
          setIsSuccess(true)
        },
      })
    },
    [submitUpdateProbationTemplate],
  )
  const initialValues = useMemo((): Partial<IProbationTemplateFormType> => {
    return {
      name: data?.name!,
      isActive: data?.isActive!,
      defaultMgr: data?.defaultMgr!,
      levelApprove: data?.levelApprove!,
      mgr1_60: data?.timelineForProbation.mgr1100!,
      mgr2_60: data?.timelineForProbation.mgr260,
      mgr1_100: data?.timelineForProbation.mgr1100!,
      mgr2_100: data?.timelineForProbation.mgr2100,
      acceptGrade: data?.timelineForProbation.acceptGrade!,
      descriptionForUser: data?.descriptionForUser!,
      descriptionForMgr: data?.descriptionForMgr!,
      calBehavior: {
        behaviorTemplateId: data?.calBehavior.behaviorTemplateId!,
        cal: data?.calBehavior.cal!,
      },
      passValue: data?.passValue!,
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
        <ProbationTemplateForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          isSuccess={isSuccess}
          isSubmitLoading={isSubmitLoading}
          isEdit={true}
        />
      )}
    </>
  )
}

export default ProbationTemplateEdit
