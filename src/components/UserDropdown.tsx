import styled from "styled-components/macro"

import { useCurrentUser } from "../services/auth/auth-query"
import { useMemo } from "react"
import Kanit from "./common/Kanit"
// import paths from "../constants/paths"

// const IconButton = styled(MuiIconButton)`
//   svg {
//     width: 22px;
//     height: 22px;
//   }
// `
const UserInfoLayout = styled.div`
  display: flex;
  align-items: center;
`

function UserDropdown() {
  // const [anchorMenu, setAnchorMenu] = useState<any>(null)
  // const history = useHistory()
  const { data: userData } = useCurrentUser()
  const currentUser = userData?.user
  // const { mutate: signOut } = useSignOut()

  const name = useMemo(() => {
    return [currentUser?.firstName, currentUser?.lastName].join(" ")
  }, [currentUser])

  // const toggleMenu = (event: SyntheticEvent) => {
  //   setAnchorMenu(event.currentTarget)
  // }

  // const closeMenu = () => {
  //   setAnchorMenu(null)
  // }

  // const handleSignOut = useCallback(() => {
  //   signOut(undefined, {
  //     onSuccess: async () => {
  //       history.push(paths.signIn())
  //     },
  //   })
  // }, [history, signOut])

  // const onProfileClick = useCallback(() => {
  //   history.push(paths.profile())
  // }, [history])

  return (
    <>
      <UserInfoLayout>
        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
        <Kanit color="#a9a9a9">{name}</Kanit>
        {/* <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <ChevronDown />
        </IconButton> */}
      </UserInfoLayout>
      {/* <Menu id="menu-appbar" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={closeMenu}>
        <MenuItem onClick={onProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu> */}
    </>
  )
}

export default UserDropdown
