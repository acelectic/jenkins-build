import { Box } from "@mui/material"
import debounce from "debounce-promise"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"
import { AutoCompleteField } from "../../../components/fields"
import { User } from "../../../services/entity-typed"
import { useGetAutoCompleteMgrOptions } from "../../../services/user/user-query"
import { UserPageResponse } from "../../../services/user/user-type"

type MgrProps = {
  editMode?: boolean
  mgr1?: User
  mgr2?: User
}

const makeMgrOptions = (data: UserPageResponse["users"]["data"]): BaseOptionType[] | undefined => {
  return data?.map((user) => {
    return {
      label: !!user ? `${user.employeeId} ${user.firstName} ${user.lastName}` : `not fount`,
      value: !!user ? user.id : `not fount`,
    }
  })
}

const MgrTable = (props: MgrProps) => {
  const { editMode = false, mgr1, mgr2 } = props
  const { t } = useTranslation()
  const { data, mutateAsync: getAsyncMgrOptions } = useGetAutoCompleteMgrOptions()

  const mgr1Value = useMemo(() => {
    if (!!mgr1) {
      return `${mgr1?.employeeId} ${mgr1?.firstName} ${mgr1?.lastName}`
    } else {
      return t("not found")
    }
  }, [mgr1, t])

  const mgr2Value = useMemo(() => {
    if (!!mgr2) {
      return `${mgr2?.employeeId} ${mgr2?.firstName} ${mgr2?.lastName}`
    } else {
      return t("not found")
    }
  }, [mgr2, t])

  const defaultMgrValue: User[] = useMemo(() => {
    const _items: User[] = []
    _items.push(mgr1!)
    _items.push(mgr2!)
    return _items
  }, [mgr1, mgr2])

  const mgrOptions = useMemo(() => {
    if (!!data?.length) {
      return makeMgrOptions(data || defaultMgrValue)
    } else {
      return makeMgrOptions(defaultMgrValue)
    }
  }, [data, defaultMgrValue])

  const loadMgrOptions = useCallback(
    async (value: string) => {
      const data = await getAsyncMgrOptions(value)
      return makeMgrOptions(data || defaultMgrValue)
    },
    [defaultMgrValue, getAsyncMgrOptions],
  )

  return (
    <>
      <Sarabun type="Body2">{t("หัวหน้าลำดับที่1")}</Sarabun>
      {editMode ? (
        <>
          <AutoCompleteField
            name="mgr1"
            label={""}
            loadOptions={debounce(loadMgrOptions, 200)}
            options={mgrOptions}
            defaultValue={mgr1?.id}
          />
        </>
      ) : (
        <Sarabun type="Subtitle1">{mgr1Value}</Sarabun>
      )}
      <Box height={16} />
      <Sarabun type="Body2">{t("หัวหน้าลำดับที่2")}</Sarabun>
      {editMode ? (
        <>
          <AutoCompleteField
            name="mgr2"
            label={""}
            loadOptions={debounce(loadMgrOptions, 200)}
            options={mgrOptions}
            defaultValue={mgr2?.id}
          />
        </>
      ) : (
        <Sarabun type="Subtitle1">{mgr2Value}</Sarabun>
      )}
    </>
  )
}

export default MgrTable
