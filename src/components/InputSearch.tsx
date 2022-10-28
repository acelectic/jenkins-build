import Input from "./common/Input"
import { TextFieldProps } from "@mui/material"
import styled from "styled-components"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import ModalSelectTable, {
  BaseModalSelectTableData,
  ModalSelectTableProps,
} from "./ModalSelectTable"
import { useVisible } from "../utils/custom-hook"

const Layout = styled.div``

export const useInputSearch = () => {
  const [text, setText] = useState("")
  const [page, setPage] = useState(1)
  const onPageChange = useCallback((page: number) => {
    setPage(page)
  }, [])

  const onSearch = useCallback((text: string) => {
    setText(text)
    setPage(1)
  }, [])

  return {
    text,
    page,
    onSearch,
    onPageChange,
  }
}

export type OnSearchFunction<PaginateResponse> = (
  params: OnSearchParams,
) => Promise<PaginateResponse> | PaginateResponse

export type OnSearchParams = {
  q: string
  page: number
  perPage: number
}

type InputSearchProps<T extends BaseModalSelectTableData> = {
  page: number
  onSelected: (data: T) => void
  onPageChange: (page: number) => void
  onSearch: (text: string) => void
  isLoading: boolean
  title: string
} & TextFieldProps &
  Partial<Pick<ModalSelectTableProps<T>, "perPage" | "totalItems" | "totalPages" | "hideSeq">> &
  Required<Pick<ModalSelectTableProps<T>, "headers" | "data">>

const InputSearch = <T extends BaseModalSelectTableData>(props: InputSearchProps<T>) => {
  const {
    page,
    onPageChange,
    onSearch,
    totalItems = 0,
    totalPages,
    data,
    onSelected,
    headers,
    perPage = 20,
    isLoading = false,
    title,
    hideSeq,
    ...restProps
  } = props
  const layoutRef = useRef<HTMLDivElement>()
  const { visible, open: show, close: hide } = useVisible()
  const [localText, setLocalText] = useState("")
  const performSearch = useCallback(() => {
    if (localText) {
      onSearch(localText)
      show()
    }
  }, [onSearch, localText, show])

  const onConfirm = useCallback(
    (data: T) => {
      onSelected(data)
      hide()
    },
    [hide, onSelected],
  )

  const onCancel = useCallback(() => {
    hide()
  }, [hide])

  const onKeyDown = useCallback(
    (ev: any) => {
      const event = ev as KeyboardEvent

      const { key } = event
      switch (key) {
        case "Enter":
          performSearch()
          break
        default:
          break
      }
    },
    [performSearch],
  )

  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = ev.target.value
      setLocalText(value)
    },
    [setLocalText],
  )

  useEffect(() => {
    const _layoutRef = layoutRef.current
    if (_layoutRef) {
      _layoutRef.addEventListener("keydown", onKeyDown)
    }
    return () => {
      _layoutRef?.removeEventListener("keydown", onKeyDown)
    }
  }, [layoutRef, onKeyDown])

  return (
    <Layout
      ref={(ref) => {
        if (ref) layoutRef.current = ref
      }}
    >
      <Input {...restProps} onChange={onChange} />
      <ModalSelectTable
        data={data}
        headers={headers}
        isOpen={visible}
        title={title}
        onConfirm={onConfirm}
        onCancel={onCancel}
        page={page}
        perPage={perPage}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={onPageChange}
        isLoading={isLoading}
        hideSeq={hideSeq}
      />
    </Layout>
  )
}

export default InputSearch
