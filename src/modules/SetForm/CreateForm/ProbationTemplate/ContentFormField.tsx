import styled from "@emotion/styled"
import { Dispatch, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../../components/common/Sarabun"
import { ERROR, GRAYSCALE_DARKGRAY_40, WHITE } from "../../../../constants/colors"
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import TargetCards from "../../../../components/TargetCards"
import { TemplateTypeDelete } from "../../../../services/set-form/set-form-type"
import { useGetOptionKpiTemplate } from "../../../../services/set-form/set-form-query"
import { TemplateCreateState } from "../../../../services/enum-typed"
import { InputField } from "../../../../components/fields"
import { useForm, useFormState } from "react-final-form"
import SumTargetCards from "../../../../components/SumTargetCards"
import { normalizeNumber } from "../../../../utils/helper"
import ModalProbationExample from "../../../../components/ModalProbationExample"
import DescriptionForUserAndMgrField from "../../component/DescriptionForUserAndMgr"
import NoOptionsAlertModal from "../../component/NoOptionsAlertModal"
import { IProbationTemplateFormType } from "./ProbationTemplateForm"

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
`

const Body = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${WHITE};
  padding: 32px 24px;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const RowSpaceBetween = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
  padding: 0px;
  gap: 8px;
`
const SetGoal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const SetScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;
  background: #edf6ff;
  border-radius: 8px;
  min-width: 100%;
`
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

type IContentFormFieldProps = {
  // values: any
  invalid: boolean
  setCurrentState: Dispatch<React.SetStateAction<TemplateCreateState>>
}

const ContentFormField = (props: IContentFormFieldProps) => {
  const { t } = useTranslation()
  const { invalid, setCurrentState } = props
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false)
  const form = useForm()
  const { data: getOptionKpiTemplate, isLoading } = useGetOptionKpiTemplate(
    TemplateTypeDelete.PROBATION,
  )
  const formState = useFormState<IProbationTemplateFormType>()
  const { values } = formState

  const dropDownBehaviorOptions = useMemo(() => {
    if (!isLoading) {
      if (
        values.calBehavior?.behaviorTemplateId &&
        !getOptionKpiTemplate?.behaviorTemplateOptions?.find(
          (option) => option.id === values.calBehavior.behaviorTemplateId,
        )
      ) {
        form.change("calBehavior.behaviorTemplateId", undefined)
        setIsOpenAlertModal(true)
      }
    }
    return getOptionKpiTemplate?.behaviorTemplateOptions?.map((behaviorTemplateOption) => {
      return {
        label: behaviorTemplateOption.name,
        value: behaviorTemplateOption.id,
      }
    })
  }, [form, getOptionKpiTemplate?.behaviorTemplateOptions, isLoading, values])

  // const onSubmit = useCallback((values) => {
  //   console.debug("values : => ", values)
  // }, [])

  const onClickChangeNextState = useCallback(() => {
    setCurrentState(TemplateCreateState.SELECT_EMPLOYEE)
  }, [setCurrentState])

  const onClickChangeBackState = useCallback(() => {
    setCurrentState(TemplateCreateState.SETTING_TEMPLATE)
  }, [setCurrentState])

  const sumScore = useMemo(() => {
    return Number(values.calBehavior?.cal)
  }, [values])

  const required = useCallback((value: unknown) => {
    return value ? undefined : "Required"
  }, [])

  const onClickOpenModal = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  return (
    <Container>
      <Body>
        <Sarabun type="H4">{t(`กำหนดเนื้อหาของแบบฟอร์ม`)}</Sarabun>
        <DescriptionForUserAndMgrField
          fieldNameForMgr="descriptionForMgr"
          fieldNameForUser="descriptionForUser"
        />

        <SetGoal>
          <RowSpaceBetween>
            <Column>
              <Sarabun type="H6">{t(`กำหนดรายละเอียดของเป้าหมายในแบบฟอร์ม`)}</Sarabun>
              <Sarabun type={"Body2"}>{t(`ผลรวมของการประเมินทั้งหมดต้องรวมได้ 100 %`)}</Sarabun>
            </Column>
          </RowSpaceBetween>

          <TargetCards
            types="behavior"
            dropDownFieldName="calBehavior.behaviorTemplateId"
            InputFieldName="calBehavior.cal"
            dropDownOptions={dropDownBehaviorOptions || []}
          />
          <SumTargetCards sumScore={sumScore} />
        </SetGoal>

        <Column style={{ gap: "16px" }}>
          <Sarabun type="H6">{t(`กำหนดระดับคะแนน`)}</Sarabun>
          <SetScore>
            <Sarabun type="Body2" style={{ display: "flex" }}>
              {t(`เกณฑ์คะแนนที่ผ่านทดลองงาน`)}
              <span>
                <Sarabun type="Body2" color={ERROR}>
                  *
                </Sarabun>
              </span>
            </Sarabun>
            <InputField
              placeholder="ใส่เป็นตัวเลข"
              name="passValue"
              variant="outlined"
              style={{ width: "381px" }}
              parse={normalizeNumber}
              validate={required}
            />
          </SetScore>
        </Column>
      </Body>
      <ButtonArea>
        <Button
          buttonType="outlined"
          width={202}
          height={48}
          startIcon={<Icon iconName="caretLeft" width={24} height={24} />}
          onClick={onClickChangeBackState}
        >
          {"ย้อนกลับ"}
        </Button>
        <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
          <Button buttonType="outlined" width={230} height={48} onClick={onClickOpenModal}>
            {"แสดงตัวอย่างแบบฟอร์ม"}
          </Button>
          <Button
            width={268}
            height={48}
            endIcon={<Icon iconName="caretRightWhite" width={24} height={24} />}
            onClick={onClickChangeNextState}
            isDisabledButton={invalid || sumScore !== 100}
          >
            {"ไปกำหนดเนื้อหาของแบบฟอร์ม"}
          </Button>
        </div>
      </ButtonArea>
      <ModalProbationExample
        visibleUseState={[isOpenModal, setIsOpenModal]}
        seq={2}
        targetScore={values.passValue}
        evaluatorMessage={values.descriptionForMgr}
        behaviorTemplateId={
          values.calBehavior !== undefined ? values.calBehavior.behaviorTemplateId : ""
        }
      />
      <NoOptionsAlertModal showModal={isOpenAlertModal} setShowModal={setIsOpenAlertModal} />
    </Container>
  )
}

export default ContentFormField
