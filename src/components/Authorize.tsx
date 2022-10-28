import { PropsWithChildren, useMemo } from "react"
import { Route, RouteProps } from "react-router-dom"
import { useGetCurrentUserPermissions } from "../services/auth/auth-query"
import { PERMISSIONS } from "../services/enum-typed"

interface AuthorizeProps extends RouteProps {
  permissions: PERMISSIONS[]
  unAuthorize?: boolean
}
const Authorize = (props: PropsWithChildren<AuthorizeProps>) => {
  const { permissions, unAuthorize, ...restProps } = props
  const {
    data: userPermissions = [],
    isLoading,
  } = useGetCurrentUserPermissions()

  const isAuthorize = useMemo(() => {
    if (!permissions.length) return true
    for (const index in permissions) {
      const permission = permissions[index]
      const _isAuthorized = userPermissions.includes(permission)

      if (_isAuthorized) {
        return true
      }
    }
    return false
  }, [permissions, userPermissions])

  return !isLoading && isAuthorize ? <Route {...restProps} /> : <></>
}

export default Authorize
