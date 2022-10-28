import { useCallback, useContext, useEffect, useState } from "react"
import { AppSnackbarProps } from "../components/AppSnackBar"
import { AppCtx } from "../constants/contexts"
import { useQueryParams } from "./helper"

type UseSnackbarProps = Partial<Omit<AppSnackbarProps, "visible">>

export const useSnackbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appContext, setAppContext] = useContext(AppCtx)
  const openSnackbar = useCallback(
    (props: UseSnackbarProps) => {
      setAppContext({
        appSnackbar: {
          visible: true,
          ...props,
        },
      })
    },
    [setAppContext],
  )

  const snackbar = useCallback(
    (props: Pick<UseSnackbarProps, "message" | "type" | "description">) => {
      const { message, type = "info", description = "" } = props

      openSnackbar({
        message,
        type,
        description,
      })
    },
    [openSnackbar],
  )
  return { snackbar }
}

export const useVisible = (defaultVisible = false) => {
  const [visible, setVisible] = useState(defaultVisible)
  const open = useCallback(() => {
    setVisible(true)
  }, [])
  const close = useCallback(() => {
    setVisible(false)
  }, [])

  return { visible, open, close }
}

type UsePageRunngerParam = {
  initialPage?: number
  initialPageSize?: number
  alias?: {
    page?: string
    perPage?: string
  }
}

export const usePageRunner = (params?: UsePageRunngerParam) => {
  const { initialPage = 1, initialPageSize = 5, alias } = params || {}
  const { page: pageParamName = "page", perPage: perPageParamName = "perPage" } = alias || {}
  const { query, setParam } = useQueryParams<any>()
  const {
    [pageParamName]: page = initialPage,
    [perPageParamName]: perPage = initialPageSize,
  } = query
  const setPage = useCallback(
    (page) => {
      setParam({
        [perPageParamName]: perPage,
        [pageParamName]: page,
      })
    },
    [pageParamName, perPage, perPageParamName, setParam],
  )
  const setPerPage = useCallback(
    (perPage) => {
      setParam({
        [perPageParamName]: perPage,
        [pageParamName]: 1,
      })
    },
    [pageParamName, perPageParamName, setParam],
  )

  const setNewPage = useCallback(
    (newPage: number) => {
      setPage(newPage)
    },
    [setPage],
  )
  const changePageSize = useCallback(
    (newPageSize: number) => {
      setPerPage(newPageSize)
    },
    [setPerPage],
  )
  return {
    page,
    setNewPage,
    pageSize: perPage,
    changePageSize,
  }
}

export const usePageInFiniteScroll = (callback: () => void) => {
  useEffect(() => {
    const onScroll = () => {
      const differencePageSize = window.innerHeight - window.pageYOffset

      if (differencePageSize < 1000 && differencePageSize > 0) {
        callback()
      }
    }

    window.removeEventListener("scroll", onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [callback])
}
