import styled from "@emotion/styled"
import { makeStyles } from "@mui/styles"
import dayjs from "dayjs"
import { useCallback, useRef } from "react"
import { useForm, useFormState } from "react-final-form"
import { FieldArray, FieldArrayRenderProps } from "react-final-form-arrays"
import { OnChange } from "react-final-form-listeners"
import { useTranslation } from "react-i18next"
import { ICreateCalibrateFormValues, ISelectUserCalibration, IUserCalibrate } from ".."
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import Sarabun from "../../../../components/common/Sarabun"
import { DatePickerField, DropdownField, InputField } from "../../../../components/fields"
import { BLACK, ERROR, WHITE } from "../../../../constants/colors"
import { QuarterType } from "../../../../services/enum-typed"
import { normalizeNumber, normalizeYear } from "../../../../utils/helper"
import SelectUser from "./SelectUser"

const useStyle = makeStyles(() => ({
  datePicker: {
    maxWidth: 300,
  },
}))

const HeaderBoxStyled = styled.div({})

const ButtonDeleteAreaStyled = styled.div({
  backgroundColor: "#525252",
  padding: 16,
  display: "flex",
  alignItems: "center",
})

const ButtonDeleteStyled = styled.div({
  display: "flex",
  flex: 1,
  justifyContent: "end",
})

const CalibrateBoxFieldStyled = styled(InputField)({
  maxWidth: 650,
  minWidth: 450,
})

const BoxFieldYearStyled = styled.div({
  display: "flex",
  flexDirection: "row",
  columnGap: "24px",
  width: "60%",
  marginTop: 32,
})

const BoxFieldNameStyled = styled.div({
  display: "flex",
  columnGap: "24px",
  width: "60%",
  marginTop: 32,
})

const BorderAreaStyled = styled.div({
  border: "1px solid black",
})

const DividerStyled = styled.div({
  backgroundColor: BLACK,
  height: 1,
  width: "100%",
  marginBottom: 16,
})

const BodyStyled = styled.div({
  marginTop: 32,
})

const DatePickerAreaStyled = styled.div({
  margin: "32px 0px",
})

export enum EnumCalibrateSelectUser {
  OWNER = "owner",
  COMMITTEES = "committees",
  HR = "hr",
  SUBJECTS = "subjects",
}

type ICreateCalibrateFieldProps = {
  fieldName: "finalCalibrateSession" | "subCalibrateSessions"
  isShowAddCalibrateButton?: boolean
  onClickSelectUser: Function
  isSubCalibrate?: boolean
  isLoading?: boolean
}

const CreateCalibrateField = (props: ICreateCalibrateFieldProps) => {
  const {
    onClickSelectUser,
    fieldName,
    isShowAddCalibrateButton = false,
    isSubCalibrate = false,
    isLoading,
  } = props
  const classes = useStyle()

  const { t } = useTranslation()

  const fieldRef = useRef<FieldArrayRenderProps<ISelectUserCalibration, HTMLElement>["fields"]>()
  const form = useForm()
  const formState = useFormState<ICreateCalibrateFormValues>()

  const periodDropdownList = [
    { label: "รายไตรมาส", value: "quarter" },
    { label: "รายครึ่งปี", value: "half_year" },
    { label: "รายปี", value: "year" },
    { label: "กำหนดเอง", value: "other" },
  ]
  const quarterDropdownList = [
    { label: "1", value: QuarterType.QUARTET_ONE },
    { label: "2", value: QuarterType.QUARTET_TWO },
    { label: "3", value: QuarterType.QUARTET_THREE },
    { label: "4", value: QuarterType.QUARTET_FOUR },
  ]
  const halfYearDropdownList = [
    { label: "ครึ่งปีแรก", value: QuarterType.FIRST_HALF },
    { label: "ครึ่งปีหลัง", value: QuarterType.SECOND_HALF },
  ]
  const required = useCallback(
    (value: any) => {
      if (!isSubCalibrate) {
        return value ? undefined : "Required"
      }
      return undefined
    },
    [isSubCalibrate],
  )

  const onAddCalibrateSession = useCallback(() => {
    fieldRef.current?.push({
      nameCalibration: "",
      detailCalibration: "",
      dateCalibration: "",
      owner: { userCalibrate: [], companies: [] },
      committees: { userCalibrate: [], companies: [] },
      hr: { userCalibrate: [], companies: [] },
      subjects: { userCalibrate: [], companies: [] },
    })
  }, [])

  const onDeleteCalibrateSession = useCallback((fieldIndex: number) => {
    fieldRef.current?.remove(fieldIndex)
  }, [])

  const onYearChange = useCallback(
    (fieldArrayName: string, index: number) => {
      const formType = fieldRef.current?.value[index].formType
      const quarter = fieldRef.current?.value[index].quarter
      const year = fieldRef.current?.value[index].year

      if (formType === "quarter") {
        //example form.change(`startDate`,dayjs(`${year}-04-01`).locale("th").format("DD MMMM YYYY"))
        if (quarter === "Q1") {
          form.change(`${fieldArrayName}.startDate`, dayjs(`${year}-01-01`))
          form.change(`${fieldArrayName}.endDate`, dayjs(`${year}-03-31`))
        } else if (quarter === "Q2") {
          form.change(`${fieldArrayName}.startDate`, dayjs(`${year}-04-01`))
          form.change(`${fieldArrayName}.endDate`, dayjs(`${year}-06-30`))
        } else if (quarter === "Q3") {
          form.change(`${fieldArrayName}.startDate`, dayjs(`${year}-07-01`))
          form.change(`${fieldArrayName}.endDate`, dayjs(`${year}-09-30`))
        } else if (quarter === "Q4") {
          form.change(`${fieldArrayName}.startDate`, dayjs(`${year}-10-01`))
          form.change(`${fieldArrayName}.endDate`, dayjs(`${year}-12-31`))
        }
      } else if (formType === "half_year") {
        if (quarter === "first_half") {
          form.change(`${fieldArrayName}.startDate`, dayjs(`${year}-01-01`))
          form.change(`${fieldArrayName}.endDate`, dayjs(`${year}-06-30`))
        } else if (quarter === "second_half") {
          form.change(`${fieldArrayName}.startDate`, dayjs(`${year}-07-01`))
          form.change(`${fieldArrayName}.endDate`, dayjs(`${year}-12-31`))
        }
      } else if (formType === "year") {
        form.change(`${fieldArrayName}.startDate`, dayjs(`${year}-01-01`))
        form.change(`${fieldArrayName}.endDate`, dayjs(`${year}-12-31`))
      }
    },
    [form],
  )

  const onClickSelect = useCallback(
    (
      calibrateSelectUser: EnumCalibrateSelectUser,
      fieldArrayIndex: number,
      fieldArrayName: string,
    ) => {
      onClickSelectUser(calibrateSelectUser, fieldArrayIndex, fieldArrayName)
    },
    [onClickSelectUser],
  )

  // หา user ที่อยู่ใน subject ของวงย่อยคัดเอาเฉพาะ user ที่ไม่ถูกลบ
  const findAndDeleteUser = useCallback(
    (subCalibrateSession: ISelectUserCalibration, userId: string) => {
      const { subjects } = subCalibrateSession
      const newSubCalibrates = subjects.userCalibrate.filter((e) => e.id !== userId)
      const newSubParams = {
        ...subCalibrateSession,
        subjects: {
          ...subjects,
          userCalibrate: newSubCalibrates,
        },
      } as ISelectUserCalibration
      return newSubParams
    },
    [],
  )

  // เช็คตอนลบของ user subject ให้ไปลบ subject ของวงย่อยด้วย
  const onDeleteUserSubject = useCallback(
    (user: IUserCalibrate) => {
      if (fieldName === "finalCalibrateSession") {
        const { subCalibrateSessions } = formState.values
        const subCalibrateIndex = subCalibrateSessions.findIndex((subCalibrateSession) => {
          const userSubject = subCalibrateSession.subjects.userCalibrate.find(
            (e) => e.id === user.id,
          )
          return userSubject
        })
        if (subCalibrateIndex >= 0) {
          const subCalibrateSession = formState.values.subCalibrateSessions[subCalibrateIndex]
          const newSubParams = findAndDeleteUser(subCalibrateSession, user.id)
          form.change(`subCalibrateSessions[${subCalibrateIndex}]`, newSubParams)
        }
      }
    },
    [fieldName, findAndDeleteUser, form, formState.values],
  )

  return (
    <BodyStyled>
      <FieldArray name={fieldName}>
        {({ fields, meta }) => {
          fieldRef.current = fields
          return (
            <>
              {fields.map((fieldArrayName, index) => {
                return (
                  <HeaderBoxStyled
                    style={{
                      border: isShowAddCalibrateButton ? "1px solid black" : "unset",
                      marginBottom: 28,
                    }}
                  >
                    {isShowAddCalibrateButton && (
                      <ButtonDeleteAreaStyled>
                        <Sarabun color={WHITE}>
                          {t("วงปรับเทียบผลงานย่อย")} - {index + 1}
                        </Sarabun>
                        <ButtonDeleteStyled>
                          <Button
                            startIcon={<Icon iconName="trashWhite" width={16} height={16} />}
                            onClick={onDeleteCalibrateSession.bind(null, index)}
                          >
                            {t("ลบวงปรับเทียบย่อย")}
                          </Button>
                        </ButtonDeleteStyled>
                      </ButtonDeleteAreaStyled>
                    )}
                    <div style={{ padding: 16 }}>
                      <div style={{ display: "flex" }}>
                        <CalibrateBoxFieldStyled
                          name={`${fieldArrayName}.nameCalibration`}
                          isRequired
                          multiline
                          rows={2}
                          label={t("ชื่อวงปรับเทียบผลงาน")}
                          validate={required}
                          style={{ marginRight: 64 }}
                        />
                        <CalibrateBoxFieldStyled
                          name={`${fieldArrayName}.detailCalibration`}
                          isRequired
                          multiline
                          rows={2}
                          label={t("รายละเอียดวงปรับเทียบผลงาน")}
                          validate={required}
                        />
                      </div>
                      {!isSubCalibrate && (
                        <>
                          <BoxFieldYearStyled>
                            <div style={{ width: "31.5%" }}>
                              <DropdownField
                                name={`${fieldArrayName}.formType`}
                                label={t(`รอบการประเมิน`)}
                                options={periodDropdownList}
                                placeHolder=""
                                isRequired={true}
                                validate={required}
                              />
                              <OnChange name={`${fieldArrayName}.formType`}>
                                {(value) => {
                                  form.change(`${fieldArrayName}.quarter`, undefined)
                                  form.change(`${fieldArrayName}.year`, "")
                                  onYearChange(fieldArrayName, index)
                                }}
                              </OnChange>
                            </div>
                            {fieldRef.current?.value[index].formType &&
                            fieldRef.current?.value[index].formType !== "other" ? (
                              <>
                                {fieldRef.current?.value[index].formType &&
                                fieldRef.current?.value[index].formType !== "year" ? (
                                  <div style={{ width: "31.5%" }}>
                                    <DropdownField
                                      name={`${fieldArrayName}.quarter`}
                                      options={
                                        fieldRef.current?.value[index].formType &&
                                        fieldRef.current?.value[index].formType === "quarter"
                                          ? quarterDropdownList
                                          : halfYearDropdownList
                                      }
                                      label={t(`ไตรมาสที่`)}
                                      style={{ width: "100%" }}
                                      placeHolder=""
                                      isRequired={true}
                                      validate={required}
                                    />
                                    <OnChange name={`${fieldArrayName}.quarter`}>
                                      {(value) => {
                                        onYearChange(fieldArrayName, index)
                                      }}
                                    </OnChange>
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <div style={{ width: "31.5%" }}>
                                  <InputField
                                    name={`${fieldArrayName}.year`}
                                    label={t(`ปีที่ทำการประเมิน(ค.ศ.)`)}
                                    style={{ width: "100%" }}
                                    placeHolder=""
                                    isRequired={true}
                                    inputProps={{ maxlength: 4 }}
                                    validate={required}
                                    format={normalizeYear}
                                    parse={normalizeNumber}
                                  />
                                  <OnChange name={`${fieldArrayName}.year`}>
                                    {(value) => {
                                      onYearChange(fieldArrayName, index)
                                    }}
                                  </OnChange>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </BoxFieldYearStyled>
                          {fieldRef.current?.value[index].formType === "other" ? (
                            <>
                              <BoxFieldNameStyled>
                                <DatePickerField
                                  name={`${fieldArrayName}.startDate`}
                                  label={t(`วันที่เริ่มการประเมิน`)}
                                  isRequired={true}
                                  style={{ width: "31.5%" }}
                                  validate={required}
                                />
                                <DatePickerField
                                  name={`${fieldArrayName}.endDate`}
                                  label={t(`วันที่จบการประเมิน`)}
                                  isRequired={true}
                                  style={{ width: "31.5%" }}
                                  validate={required}
                                />
                              </BoxFieldNameStyled>
                            </>
                          ) : (
                            <>
                              {fieldRef.current?.value[index].formType === "year" &&
                                fieldRef.current?.value[index].year && (
                                  <>
                                    <BoxFieldNameStyled>
                                      <DatePickerField
                                        name={`${fieldArrayName}.startDate`}
                                        label={t(`วันที่เริ่มการประเมิน`)}
                                        isRequired={true}
                                        style={{ width: "31.5%" }}
                                        validate={required}
                                        disabled={true}
                                      />
                                      <DatePickerField
                                        name={`${fieldArrayName}.endDate`}
                                        label={t(`วันที่จบการประเมิน`)}
                                        isRequired={true}
                                        style={{ width: "31.5%" }}
                                        validate={required}
                                        disabled={true}
                                      />
                                    </BoxFieldNameStyled>
                                  </>
                                )}
                              {fieldRef.current?.value[index].formType !== "year" &&
                                fieldRef.current?.value[index].quarter &&
                                fieldRef.current?.value[index].year && (
                                  <>
                                    <BoxFieldNameStyled>
                                      <DatePickerField
                                        name={`${fieldArrayName}.startDate`}
                                        label={t(`วันที่เริ่มการประเมิน`)}
                                        isRequired={true}
                                        style={{ width: "31.5%" }}
                                        validate={required}
                                        disabled={true}
                                      />
                                      <DatePickerField
                                        name={`${fieldArrayName}.endDate`}
                                        label={t(`วันที่จบการประเมิน`)}
                                        isRequired={true}
                                        style={{ width: "31.5%" }}
                                        validate={required}
                                        disabled={true}
                                      />
                                    </BoxFieldNameStyled>
                                  </>
                                )}
                            </>
                          )}
                        </>
                      )}

                      <DatePickerAreaStyled>
                        <DatePickerField
                          name={`${fieldArrayName}.dateCalibration`}
                          label={t("วันที่นัดปรับเทียบผลงาน")}
                          className={classes.datePicker}
                        />
                      </DatePickerAreaStyled>

                      <Sarabun>
                        {t("เลือกคนเข้าวงปรับเทียบผลงาน")}
                        {<span style={{ color: `${ERROR}` }}>*</span>}
                      </Sarabun>
                      <BorderAreaStyled>
                        <SelectUser
                          onClickSelect={onClickSelect.bind(
                            null,
                            EnumCalibrateSelectUser.OWNER,
                            index,
                          )}
                          title={t("ประธานวง (Owner)")}
                          fieldArrayName={`${fieldArrayName}.owner`}
                          isLoading={isLoading}
                          isRequired
                        />
                        <DividerStyled />

                        <SelectUser
                          onClickSelect={onClickSelect.bind(
                            null,
                            EnumCalibrateSelectUser.COMMITTEES,
                            index,
                          )}
                          title={t("คณะกรรมการ (Committees)")}
                          fieldArrayName={`${fieldArrayName}.committees`}
                          isLoading={isLoading}
                        />
                        <DividerStyled />

                        <SelectUser
                          onClickSelect={onClickSelect.bind(
                            null,
                            EnumCalibrateSelectUser.HR,
                            index,
                          )}
                          title={t("HR ที่ดูแล")}
                          fieldArrayName={`${fieldArrayName}.hr`}
                          isLoading={isLoading}
                          isRequired
                        />
                        <DividerStyled />

                        <SelectUser
                          title={t("พนักงานที่ได้รับการประเมิน (Subjects)")}
                          onClickSelect={onClickSelect.bind(
                            null,
                            EnumCalibrateSelectUser.SUBJECTS,
                            index,
                          )}
                          fieldArrayName={`${fieldArrayName}.subjects`}
                          onDeleteUser={onDeleteUserSubject}
                          isLoading={isLoading}
                          isRequired
                        />
                      </BorderAreaStyled>
                    </div>
                  </HeaderBoxStyled>
                )
              })}
            </>
          )
        }}
      </FieldArray>

      {isShowAddCalibrateButton && (
        <Button style={{ maxWidth: 250 }} onClick={onAddCalibrateSession}>
          {t("+ เพิ่มวงปรับเทียบผลงานย่อย")}
        </Button>
      )}
    </BodyStyled>
  )
}

export default CreateCalibrateField
