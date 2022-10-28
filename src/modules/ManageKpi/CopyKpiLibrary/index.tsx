import { useMemo, useState, useCallback } from "react"
import { useTranslation } from "react-i18next"
import LoadingLayout from "../../../components/common/LoadingLayout"
import { KpiLibrary } from "../../../services/entity-typed"
import {
  useCreateKpiTransactionDetail,
  useGetKpiLibrary,
} from "../../../services/manage-kpi/manage-kpi-query"
import { ISubmitCreateKpiTransactionDetail } from "../../../services/manage-kpi/mange-kpi-type"
import { useRouter } from "../../../utils/helper"
import KpiTransactionDetailTemplate from "../CreateKpi/KpiTransactionDetailTemplate"

const CopyKpiLibrary = () => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { data, isLoading } = useGetKpiLibrary()
  const [success, setSuccess] = useState(false)
  const KpiLibraryData = useMemo(() => {
    const kpiLibraryTarget: KpiLibrary[] = []
    data?.kpiLibrary.forEach((kpiLibrary) => {
      kpiLibrary.kpiLibraries
        .filter((e) => e.id === query.kpiLibraryId)
        .forEach((data, index) => {
          kpiLibraryTarget.push(data)
        })
    })
    return kpiLibraryTarget[0]
  }, [data, query.kpiLibraryId])

  const {
    mutate: submitCreateKpiTransactionDetail,
    isLoading: isLoadingSubmit,
  } = useCreateKpiTransactionDetail()

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

  const initialValues = useMemo(() => {
    return {
      name: KpiLibraryData?.name,
      description: KpiLibraryData?.description,
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
      selectedEmployees: [],
    }
  }, [KpiLibraryData?.description, KpiLibraryData?.name])

  const categoryOption = useMemo(() => {
    return data?.options?.categoryTypes.map(
      (type) => ({ label: type, value: type } as BaseOptionType),
    )
  }, [data?.options?.categoryTypes])

  const unitOption = useMemo(() => {
    return data?.options?.units.map((unit) => {
      return { label: t(`${unit}`), value: unit } as BaseOptionType
    })
  }, [data?.options?.units, t])

  return (
    <LoadingLayout isLoading={isLoading}>
      <KpiTransactionDetailTemplate
        title={"คัดลอกเป้าหมาย"}
        onSubmit={onSubmit}
        initialValues={initialValues}
        isSuccess={success}
        isLoadingSubmit={isLoadingSubmit}
        unitOption={unitOption}
        categoryOption={categoryOption}
      />
    </LoadingLayout>
  )
}

export default CopyKpiLibrary
