import styled from "@emotion/styled"
import { useCallback, useMemo, useState } from "react"
import { Form } from "react-final-form"
import { useTranslation } from "react-i18next"
import arrayMutators from "final-form-arrays"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_40, GRAYSCALE_LIGHTGRAY_20, WHITE } from "../../../constants/colors"
import {
  IQuotaGradeType,
  IQuotaGradeResponseType,
  IUpdateQuotaGradeParams,
} from "../../../services/quota-grade/quota-grade-type"
import { useQuotaGrade, useUpdateQuotaGrade } from "../../../services/quota-grade/quota-grade-query"
import { FieldArray } from "react-final-form-arrays"
import { first, sum } from "lodash"
import QuotaGradeRow from "./QuotaGradeRow"
import LoadingLayout from "../../../components/common/LoadingLayout"

const Body = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  gap: 24px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  gap: 32px;
  background: ${WHITE};
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const ContentZone = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  padding: 8px 16px;
  gap: 8px;
  background-color: ${GRAYSCALE_LIGHTGRAY_20};
  align-items: center;
  border-radius: 8px 8px 0px 0px;
`

const TitleRow = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`

type IQuotaGradeFormType = IQuotaGradeResponseType & {}

const QuotaGrade = () => {
  const [currentEditedId, setCurrentEditedId] = useState<string>("")
  const { t } = useTranslation()

  const { data: quotaGradesData, isLoading } = useQuotaGrade()
  const quotaGrades: IQuotaGradeType[] = useMemo(() => quotaGradesData?.quotaGrades || [], [
    quotaGradesData?.quotaGrades,
  ])

  const { mutate: updateQuotaGrade } = useUpdateQuotaGrade(currentEditedId)

  const onSubmit = useCallback(
    (values: IQuotaGradeFormType) => {
      const currentEditedValueList: IQuotaGradeType[] = values.quotaGrades.filter(
        (value) => value.id === currentEditedId,
      )
      const params: IUpdateQuotaGradeParams = {
        isCalibrated: first(currentEditedValueList)?.isCalibrated,
        isLocked: first(currentEditedValueList)?.isLocked,
        grades: first(currentEditedValueList)?.grades.map((grade) => {
          return {
            grade: Number(grade.grade),
            quota: Number(grade.quota),
          }
        }),
      }
      updateQuotaGrade(params)
    },
    [currentEditedId, updateQuotaGrade],
  )

  const initialValues: IQuotaGradeFormType = useMemo<IQuotaGradeFormType>(() => {
    return { quotaGrades: quotaGrades }
  }, [quotaGrades])

  return (
    <LoadingLayout isLoading={isLoading}>
      <Form<IQuotaGradeFormType>
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={(values) => {
          const { quotaGrades } = values
          const errors: IFormValueErrors<IQuotaGradeFormType> = { quotaGrades: [] }
          const quotaGradeErrors = errors.quotaGrades || []
          quotaGrades.forEach((quota, quotaIndex) => {
            let quotaError = quotaGradeErrors[quotaIndex] || {}
            const arrayQuota: number[] = quota.grades.map((grade) => {
              return Number(grade.quota)
            })
            const totalQuota = sum(arrayQuota)

            if (totalQuota !== 100) {
              quotaError.grades = quota.grades.map(() => {
                return {
                  grade: "",
                  quota: "",
                }
              })
            }
            quotaGradeErrors[quotaIndex] = quotaError
          })
          errors.quotaGrades = quotaGradeErrors
          return errors
        }}
        mutators={{
          ...arrayMutators,
        }}
      >
        {({ handleSubmit, invalid }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Body>
                <Sarabun type="H2" color={WHITE}>
                  {t(`โควต้าเกรด`)}
                </Sarabun>
                <Card>
                  <TitleRow>
                    <Icon iconName="menu" width={24} height={24} />
                    <Sarabun type="H4">{t(`โควต้าทั้งหมด`)}</Sarabun>
                  </TitleRow>
                  <ContentZone>
                    <Header>
                      <Sarabun type="Subtitle2">{t(`โควต้า`)}</Sarabun>
                    </Header>
                    <FieldArray name={"quotaGrades"}>
                      {({ fields }) => {
                        return fields.map((fieldName) => {
                          return (
                            <QuotaGradeRow
                              key={fieldName}
                              fieldName={fieldName}
                              invalid={invalid}
                              onOk={handleSubmit}
                              setCurrentEditedId={setCurrentEditedId}
                            />
                          )
                        })
                      }}
                    </FieldArray>
                  </ContentZone>
                </Card>
              </Body>
            </form>
          )
        }}
      </Form>
    </LoadingLayout>
  )
}

export default QuotaGrade
