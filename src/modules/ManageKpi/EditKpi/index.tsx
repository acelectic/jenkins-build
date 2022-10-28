import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import LoadingLayout from "../../../components/common/LoadingLayout"
import {
  useGetKpiTransactionDetail,
  useUpdateKpiTransactionDetail,
} from "../../../services/manage-kpi/manage-kpi-query"
import {
  ISubmitCreateKpiTransactionDetail,
  ISubmitUpdateKpiTransactionDetail,
} from "../../../services/manage-kpi/mange-kpi-type"
import { useRouter } from "../../../utils/helper"
import KpiTransactionDetailTemplate from "../CreateKpi/KpiTransactionDetailTemplate"

const EditKpi = () => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const [success, setSuccess] = useState(false)
  const { data, isLoading } = useGetKpiTransactionDetail(query.kpiTransactionDetailId)

  const {
    mutate: submitUpdateKpiTransactionDetail,
    isLoading: isLoadingSubmit,
  } = useUpdateKpiTransactionDetail()

  const onSubmit = useCallback(
    (values: ISubmitCreateKpiTransactionDetail) => {
      const { kpiTransactionIds, transactionDetails, actual, userSelected } = values
      const params: ISubmitUpdateKpiTransactionDetail = {
        userSelected,
        kpiTransactionIds,
        assignmentType: "assign",
        kpiTransactionDetailBody: transactionDetails[0],
        actual,
      }
      submitUpdateKpiTransactionDetail(params, {
        onSuccess: () => {
          setSuccess(true)
        },
      })
    },
    [submitUpdateKpiTransactionDetail],
  )

  const initialValues = useMemo(() => {
    if (!!data?.kpiTransactionDetail) {
      const selectedUserIds: string[] = []
      data?.kpiTransactionDetail.kpiTransactions.forEach((kpiTransaction) => {
        selectedUserIds.push(kpiTransaction.userId)
      }, [])
      return {
        id: data?.kpiTransactionDetail.id,
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
          selectedIds: selectedUserIds,
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
        title={"แก้ไขเป้าหมาย"}
        initialValues={initialValues}
        onSubmit={onSubmit}
        unitOption={unitOptions}
        categoryOption={categoryOptions}
        isLoadingSubmit={isLoadingSubmit}
        isSuccess={success}
      />
    </LoadingLayout>
  )
}

export default EditKpi
