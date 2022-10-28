import { useCallback, useMemo, useState } from "react"
import Modal from "../../../components/common/Modal"
import ModalCopyForm, {
  ModalCopyFormType,
  StateModalCopyForm,
} from "../../../components/ModalCopyForm"
import paths from "../../../constants/paths"
import { useCalibrateSession } from "../../../services/manage-calibration/manage-calibration-query"
import { ICalibrateSession } from "../../../services/manage-calibration/manage-calibration-type"
import { useRouter } from "../../../utils/helper"

type CopyCalibrationModalProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const CopyCalibrationModal = (props: CopyCalibrationModalProps) => {
  const { visibleUseState } = props

  const { push } = useRouter()
  const [searchText, setSearchText] = useState<string>("")

  const params = useMemo(() => {
    return {
      q: searchText,
      limit: 10,
    }
  }, [searchText])

  const {
    data: calibrationData,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isLoading,
  } = useCalibrateSession(params)

  const fetchItems = useCallback(() => {
    if (!isFetching) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetching])

  const dataCopyForm = useMemo(() => {
    const calibrateSessions =
      calibrationData?.pages.reduce((acc: ICalibrateSession[], page) => {
        acc.push(...page.calibrateSessions)
        return acc
      }, []) || []
    const items = calibrateSessions.map((calibrateSession) => {
      const { finalCalibrateSession } = calibrateSession
      const { name, description, id } = finalCalibrateSession
      return {
        name: name,
        description: description,
        id: id,
      } as ModalCopyFormType
    })
    return items
  }, [calibrationData?.pages])

  const onSelectCopy = useCallback(
    (id: string) => {
      push(paths.manageCalibrationCopy({ routeParam: { calibrationId: id } }))
    },
    [push],
  )

  const onSearch = useCallback((keyWord: string) => {
    setSearchText(keyWord)
  }, [])

  return (
    <>
      <Modal
        visibleUseState={visibleUseState}
        style={{ width: "100%" }}
        showCancelButton={false}
        showOkButton={false}
      >
        <ModalCopyForm
          dataCopyForm={dataCopyForm}
          fetchItems={fetchItems}
          hasNextPage={hasNextPage}
          stateModal={StateModalCopyForm.CALIBRATION}
          onSelectCopy={onSelectCopy}
          onSearchWord={onSearch}
          isLoading={isLoading}
        />
      </Modal>
    </>
  )
}

export default CopyCalibrationModal
