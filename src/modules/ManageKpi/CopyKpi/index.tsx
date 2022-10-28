import { useMemo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import LoadingLayout from "../../../components/common/LoadingLayout"
import {
  useCreateKpiTransactionDetail,
  useGetKpiTransactionDetail,
} from "../../../services/manage-kpi/manage-kpi-query"
import { ISubmitCreateKpiTransactionDetail } from "../../../services/manage-kpi/mange-kpi-type"
import { useRouter } from "../../../utils/helper"
import KpiTransactionDetailTemplate from "../CreateKpi/KpiTransactionDetailTemplate"

const CopyKpi = () => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { data, isLoading } = useGetKpiTransactionDetail(query.kpiTransactionDetailId)
  const [success, setSuccess] = useState(false)
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
    if (!!data?.kpiTransactionDetail) {
      return {
        kpiType: data?.kpiTransactionDetail?.kpiType,
        name: data?.kpiTransactionDetail?.name,
        description: data?.kpiTransactionDetail?.description,
        target: data?.kpiTransactionDetail?.target,
        unitType: data?.kpiTransactionDetail?.unitType,
        customUnitType: data?.kpiTransactionDetail?.customUnitType,
        scoreType: data?.kpiTransactionDetail?.scoreType,
        weight: data?.kpiTransactionDetail?.weight,
        actual: data?.kpiTransactionDetail?.actual,
        goalCategory: data?.kpiTransactionDetail?.goalCategory,
        scales: data?.kpiTransactionDetail.jsonScale.jsonScaleDetails,
        positionTarget: data?.kpiTransactionDetail.jsonScale.positionTarget,
        userSelected: {
          isCheckedAll: false,
          selectedIds: [],
          excludeIds: [],
        },
      }
    }
  }, [data])

  const categoryOptions = useMemo(() => {
    return data?.options?.categoryTypes.map(
      (type) => ({ label: type, value: type } as BaseOptionType),
    )
  }, [data?.options?.categoryTypes])

  const unitOptions = useMemo(() => {
    return data?.options?.units.map((unit) => {
      return { label: t(`${unit}`), value: unit } as BaseOptionType
    })
  }, [data?.options?.units, t])

  return (
    <LoadingLayout isLoading={isLoading}>
      <KpiTransactionDetailTemplate
        title={"คัดลอกเป้าหมาย"}
        initialValues={initialValues}
        onSubmit={onSubmit}
        isSuccess={success}
        isLoadingSubmit={isLoadingSubmit}
        unitOption={unitOptions}
        categoryOption={categoryOptions}
      />
    </LoadingLayout>
  )
}

export default CopyKpi
