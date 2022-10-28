import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import LoadingLayout from "../../../components/common/LoadingLayout"
import {
  useCreateKpiTransactionDetail,
  useGetOptions,
} from "../../../services/manage-kpi/manage-kpi-query"
import { ISubmitCreateKpiTransactionDetail } from "../../../services/manage-kpi/mange-kpi-type"
import KpiTransactionDetailTemplate from "./KpiTransactionDetailTemplate"

const CreateKpi = () => {
  const { mutate: submitCreateKpiTransactionDetail, isLoading } = useCreateKpiTransactionDetail()
  const { data: optionsData, isLoading: isOptionsLoading } = useGetOptions()
  const [success, setSuccess] = useState(false)
  const { t } = useTranslation()

  const onSubmit = useCallback(
    (values: ISubmitCreateKpiTransactionDetail) => {
      submitCreateKpiTransactionDetail(values, {
        onSuccess: () => {
          setSuccess(true)
        },
      })
    },
    [submitCreateKpiTransactionDetail],
  )

  const categoryOptions = useMemo(() => {
    return optionsData?.categoryTypes.map(
      (type) => ({ label: type, value: type } as BaseOptionType),
    )
  }, [optionsData?.categoryTypes])

  const unitOptions = useMemo(() => {
    return optionsData?.units.map((unit) => {
      return { label: t(`${unit}`), value: unit } as BaseOptionType
    })
  }, [optionsData?.units, t])

  const initialValues = useMemo(() => {
    return {
      scoreType: "positive",
      scales: [
        {
          color: "#ff0000",
          value: 1389270792,
          scaleName: "1",
          description: "ไม่น่าพึงพอใจ (Unsatisfactory)",
        },
        {
          color: "#ff8400",
          value: 1852361056,
          scaleName: "2",
          description: "จำเป็นต้องปรับปรุง (Needs Improvement)",
        },
        {
          color: "#fff700",
          value: 2315451320,
          scaleName: "3",
          description: "ส่วนใหญ่เป็นไปตามที่คาดหมาย (Partially Meets Expectations)",
        },
        {
          color: "#00ff04",
          value: 2778541584,
          scaleName: "4",
          description: "ทั้งหมดเกินความคาดหมาย (Exceeds Expectations)",
        },
        {
          color: "#1500ff",
          value: 3241631848,
          scaleName: "5",
          description: "ส่วนใหญ่เกินความคาดหมาย (Partially Exceeds Expectations)",
        },
        {
          color: "#9d00ff",
          value: 3704722112,
          scaleName: "6",
          description: "โดดเด่น (Outstanding)",
        },
      ],
      positionTarget: "4",
      userSelected: {
        isCheckedAll: false,
        selectedIds: [],
        excludeIds: [],
      },
    }
  }, [])

  return (
    <LoadingLayout isLoading={isOptionsLoading}>
      <KpiTransactionDetailTemplate
        onSubmit={onSubmit}
        initialValues={initialValues}
        isLoadingSubmit={isLoading}
        isSuccess={success}
        unitOption={unitOptions}
        categoryOption={categoryOptions}
      />
    </LoadingLayout>
  )
}

export default CreateKpi
