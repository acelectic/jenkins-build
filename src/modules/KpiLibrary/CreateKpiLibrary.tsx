import { Field, Form } from "react-final-form"
import { useCallback, useMemo, useState } from "react"
import { makeStyles } from "@mui/styles"
import Modal from "../../components/common/Modal"
import Sarabun from "../../components/common/Sarabun"
import Button from "../../components/common/Button"
import { DropdownField, InputField } from "../../components/fields"
import { composeValidators, maxLength, required } from "../../utils/field-validation"
import { useTranslation } from "react-i18next"

import {
  useCreateKpiLibrary,
  useOptionCategory,
  useUpdateKpiLibrary,
} from "../../services/kpi-library/kpi-library-query"
import ModalConfirmEdit from "./ModalConfirmEdit"
import { CreateKpiLibraryParams } from "../../services/kpi-library/kpi-library-types"

const useStyle = makeStyles((theme) => ({
  headerModal: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  headerForm: {
    display: "flex",
    flexDirection: "column",
  },
  inputHeader: {
    display: "flex",
    justifyContent: "flex-start",
  },
  buttonArea: {
    margin: "40px 0px 0px 0px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  buttonCancel: {
    justifyContent: "start",
    justifyItems: "start",
  },
  buttonCancelIcon: {
    marginRight: "25px",
  },
  headerIndex: {
    margin: "12px 16px",
  },
  headerName: {
    margin: "16px 0",
  },
  headerDescription: {
    margin: "24px 0px 0px 0px",
  },
  headerCategory: {
    margin: "24px 0px 0px 0px",
    display: "flex",
    justifyContent: "space-between",
  },
}))

export type CopyGoalDetailProps = {
  openCreateKpiLibrary: boolean
  setOpenCreateKpiLibrary: React.Dispatch<React.SetStateAction<boolean>>
  dataKpiLibrary?: CreateKpiLibraryForm
  isCreate?: boolean
}
type CreateKpiLibraryForm = {
  name: string
  description: string
  category: string
  nameCategory?: string
  id?: string
}

const CreateKpiLibrary = (props: CopyGoalDetailProps) => {
  const classes = useStyle()

  const { t } = useTranslation()
  const { openCreateKpiLibrary, setOpenCreateKpiLibrary, dataKpiLibrary, isCreate = true } = props
  const { data: category } = useOptionCategory()
  const { mutate: createKpiLibrary } = useCreateKpiLibrary()
  const { mutate: updateKpiLibrary } = useUpdateKpiLibrary()
  const categoryOptions = useMemo(() => {
    const option =
      category?.optionsCategory.map((item, index) => {
        return {
          label: item,
          value: item,
        }
      }) || []
    option.push({ label: "+???????????????????????????????????????????????????", value: "???????????????" })
    return option
  }, [category?.optionsCategory])

  const initialValues = useMemo(() => {
    const { name, description, id, category } = dataKpiLibrary || {}
    return {
      name: name,
      description: description,
      id: id,
      category: category,
    }
  }, [dataKpiLibrary])

  const onCloseModal = useCallback(() => {
    setOpenCreateKpiLibrary(false)
  }, [setOpenCreateKpiLibrary])
  const [valuesUpdateKpiLibrary, setValuesUpdateKpiLibrary] = useState<CreateKpiLibraryParams>()

  const onSubmit = useCallback(
    (values) => {
      if (values.category === "???????????????") {
        values.category = values.nameCategory
      }
      setValuesUpdateKpiLibrary(values)

      if (isCreate) {
        createKpiLibrary(values)
      } else {
        setShowConfirmModal(true)
      }
      onCloseModal()
    },
    [createKpiLibrary, isCreate, onCloseModal],
  )

  const onUpdateKpiLibrary = useCallback(
    (values) => {
      updateKpiLibrary(values)
      setShowConfirmModal(false)
    },
    [updateKpiLibrary],
  )
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const onCancelConfirmModal = useCallback(() => {
    setShowConfirmModal(false)
  }, [])

  return (
    <div className={classes.headerModal}>
      <Modal
        visibleUseState={[openCreateKpiLibrary, setOpenCreateKpiLibrary]}
        closeOnClickOutside={false}
        showCancelButton={false}
        showOkButton={false}
        showCloseIcon
        onClose={onCloseModal}

        // isLoading={isLoading}
      >
        <div className={classes.headerForm}>
          <div className={classes.inputHeader}>
            <Sarabun type="H3">
              {isCreate ? `????????????????????????????????????????????????????????? Library` : "????????????????????????????????????????????????????????????????????? ?????? Library"}
            </Sarabun>
          </div>

          <Form<CreateKpiLibraryForm>
            onSubmit={onSubmit}
            initialValues={initialValues}
            destroyOnUnregister
            validate={(values) => {
              const error: FormValueErrorsType<CreateKpiLibraryForm> = {}
              if (values.category === "???????????????" && !values.nameCategory) {
                error.nameCategory = t("please-insert-name-category")
              }

              return error
            }}
          >
            {({ handleSubmit, invalid }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div style={{ paddingTop: 24 }}>
                    <InputField
                      name={"name"}
                      label="???????????????????????????????????? (Goal name)"
                      placeholder="?????????????????????????????????????????????"
                      isRequired={true}
                      showDescription={false}
                      rows={3}
                      multiline={true}
                      validate={composeValidators(
                        maxLength(200, t("validate.tooLong")),
                        required(t("please-insert-name-kpi-library")),
                      )}
                    />
                  </div>
                  <div className={classes.headerDescription}>
                    <InputField
                      name={`description`}
                      label="???????????????????????????????????????????????????????????????????????????????????? (Measurement)"
                      subLabel="???????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????"
                      placeholder="?????????????????????????????????????????????"
                      isRequired={true}
                      rows={3}
                      multiline={true}
                      validate={composeValidators(
                        maxLength(1000, t("validate.tooLong")),
                        required(t("please-insert-description-kpi-library")),
                      )}
                    />
                  </div>
                  <div className={classes.headerCategory}>
                    <DropdownField
                      name={`category`}
                      options={categoryOptions}
                      label="???????????????????????? (Category)"
                      placeHolder="??????????????????????????????"
                      validate={required(t("please-insert-category"))}
                      isRequired={true}
                      style={{ width: "250px" }}
                    />
                    <Field name={`category`}>
                      {({ input }) => {
                        const isCategoryOther = `${input.value}` === "???????????????" ? true : false
                        return (
                          <>
                            {isCategoryOther && (
                              <InputField
                                name={`nameCategory`}
                                label="????????????????????????????????????"
                                placeholder="????????????????????????????????????????????????"
                                style={{ width: "250px" }}
                              />
                            )}
                          </>
                        )
                      }}
                    </Field>
                  </div>

                  <div className={classes.buttonArea}>
                    <Button width={280} height={46} onClick={onCloseModal} buttonType={"outlined"}>
                      ??????????????????
                    </Button>
                    <Button
                      width={280}
                      height={46}
                      onClick={handleSubmit}
                      isDisabledButton={invalid}
                    >
                      ??????????????????
                    </Button>
                  </div>
                </form>
              )
            }}
          </Form>
        </div>
      </Modal>
      <ModalConfirmEdit
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        onOk={onUpdateKpiLibrary.bind(null, valuesUpdateKpiLibrary)}
        onClose={onCancelConfirmModal}
      />
    </div>
  )
}

export default CreateKpiLibrary
