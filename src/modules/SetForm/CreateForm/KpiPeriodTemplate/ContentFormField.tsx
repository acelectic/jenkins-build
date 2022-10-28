import styled from "@emotion/styled"
import { Dispatch, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import Sarabun from "../../../../components/common/Sarabun"
import SetScoreLevel from "../../../../components/common/SetScoreLevel"
import { GRAYSCALE_DARKGRAY_40, WHITE } from "../../../../constants/colors"
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import TargetCards from "../../../../components/TargetCards"
import { TemplateCreateState } from "../../../../services/enum-typed"
import { useGetOptionKpiTemplate } from "../../../../services/set-form/set-form-query"
import { TemplateTypeDelete } from "../../../../services/set-form/set-form-type"
import SumTargetCards from "../../../../components/SumTargetCards"
import { useForm, useFormState } from "react-final-form"
import ModalKpiTemplateExample from "../../../../components/ModalKpiTemplateExample"
import dayjs from "dayjs"
import DescriptionForUserAndMgrField from "../../component/DescriptionForUserAndMgr"
import NoOptionsAlertModal from "../../component/NoOptionsAlertModal"
import { IKpiPeriodTemplateForm } from "./KpiTemplateForm"

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
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

type IContentFormFieldProps = {
  invalid: boolean
  setCurrentState: Dispatch<React.SetStateAction<TemplateCreateState>>
}

const ContentFormField = (props: IContentFormFieldProps) => {
  const { t } = useTranslation()

  const { invalid, setCurrentState } = props
  const form = useForm()
  const formState = useFormState<IKpiPeriodTemplateForm>()
  const { values } = formState
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false)

  const { data: getOptionKpiTemplate, isLoading } = useGetOptionKpiTemplate(TemplateTypeDelete.KPI)
  const dropDownScaleOptions = useMemo(() => {
    if (!isLoading) {
      if (
        values?.jsonCalKpi?.scaleId &&
        !getOptionKpiTemplate?.scaleOptions?.find(
          (option) => option.id === values.jsonCalKpi.scaleId,
        )
      ) {
        form.change("jsonCalKpi.scaleId", undefined)
        setIsOpenAlertModal(true)
      }
      if (
        values?.jsonCalKpiCompany?.scaleId &&
        !getOptionKpiTemplate?.scaleOptions?.find(
          (option) => option.id === values.jsonCalKpiCompany.scaleId,
        )
      ) {
        form.change("jsonCalKpiCompany.scaleId", undefined)
        setIsOpenAlertModal(true)
      }
      if (
        values?.jsonCalKpiOther?.scaleId &&
        !getOptionKpiTemplate?.scaleOptions?.find(
          (option) => option.id === values.jsonCalKpiOther.scaleId,
        )
      ) {
        form.change("jsonCalKpiOther.scaleId", undefined)
        setIsOpenAlertModal(true)
      }
    }
    return getOptionKpiTemplate?.scaleOptions?.map((scaleOption) => {
      return { label: scaleOption.name, value: scaleOption.id }
    })
  }, [form, getOptionKpiTemplate?.scaleOptions, isLoading, values])

  const dropDownBehaviorOptions = useMemo(() => {
    if (!isLoading) {
      if (
        values?.jsonCalBehavior?.behaviorTemplateId &&
        !getOptionKpiTemplate?.behaviorTemplateOptions?.find(
          (option) => option.id === values.jsonCalBehavior.behaviorTemplateId,
        )
      ) {
        form.change("jsonCalBehavior.behaviorTemplateId", undefined)
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

  const onClickChangeNextState = useCallback(() => {
    setCurrentState(TemplateCreateState.SELECT_EMPLOYEE)
  }, [setCurrentState])

  const onClickChangeBackState = useCallback(() => {
    setCurrentState(TemplateCreateState.SETTING_TEMPLATE)
  }, [setCurrentState])

  const sumScore = useMemo(() => {
    return (
      Number(values?.jsonCalKpi?.cal || 0) +
      Number(values?.jsonCalKpiCompany?.cal || 0) +
      Number(values?.jsonCalKpiOther?.cal || 0) +
      Number(values?.jsonCalBehavior?.cal || 0)
    )
  }, [values])

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
            types="kpi"
            dropDownFieldName="jsonCalKpi.scaleId"
            InputFieldName="jsonCalKpi.cal"
            dropDownOptions={dropDownScaleOptions || []}
          />
          <TargetCards
            types="company"
            dropDownFieldName="jsonCalKpiCompany.scaleId"
            InputFieldName="jsonCalKpiCompany.cal"
            dropDownOptions={dropDownScaleOptions || []}
          />
          <TargetCards
            types="other"
            dropDownFieldName="jsonCalKpiOther.scaleId"
            InputFieldName="jsonCalKpiOther.cal"
            dropDownOptions={dropDownScaleOptions || []}
          />
          <TargetCards
            types="behavior"
            dropDownFieldName="jsonCalBehavior.behaviorTemplateId"
            InputFieldName="jsonCalBehavior.cal"
            dropDownOptions={dropDownBehaviorOptions || []}
          />
          <SumTargetCards sumScore={sumScore} />
        </SetGoal>
        <SetScoreLevel
          fieldName="scaleForGrade"
          // isViewMode
          jsonScaleDetails={values?.scaleForGrade?.jsonScaleDetails}
        />
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
          <Button
            isDisabledButton={invalid || sumScore !== 100}
            buttonType="outlined"
            width={230}
            height={48}
            onClick={onClickOpenModal}
          >
            {"แสดงตัวอย่างแบบฟอร์ม"}
          </Button>
          <Button
            isDisabledButton={invalid || sumScore !== 100}
            width={268}
            height={48}
            endIcon={<Icon iconName="caretRightWhite" width={24} height={24} />}
            onClick={onClickChangeNextState}
          >
            {"ไปกำหนดเนื้อหาของแบบฟอร์ม"}
          </Button>
        </div>
      </ButtonArea>
      <ModalKpiTemplateExample
        visibleUseState={[isOpenModal, setIsOpenModal]}
        data={{
          calKpi: values.jsonCalKpi !== undefined ? Number(values.jsonCalKpi.cal) : 0,
          calCompany:
            values.jsonCalKpiCompany !== undefined ? Number(values.jsonCalKpiCompany.cal) : 0,
          calOther: values.jsonCalKpiOther !== undefined ? Number(values.jsonCalKpiOther.cal) : 0,
          calBehavior:
            values.jsonCalBehavior !== undefined ? Number(values.jsonCalBehavior.cal) : 0,
        }}
        year={values.year}
        quarter={values.quarter}
        startDate={dayjs(values.startDate).locale("th").format("DD MMMM")}
        endDate={dayjs(values.endDate).locale("th").format("DD MMMM")}
        behaviorTemplateId={
          values.jsonCalBehavior !== undefined ? values.jsonCalBehavior.behaviorTemplateId : ""
        }
        descriptionForUser={values.descriptionForUser}
      />
      <NoOptionsAlertModal showModal={isOpenAlertModal} setShowModal={setIsOpenAlertModal} />
    </Container>
  )
}

export default ContentFormField
