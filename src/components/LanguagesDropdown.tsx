import * as React from "react"
import styled from "styled-components/macro"

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material"

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`

function LanguagesDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null)

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorMenu(null)
  }

  return (
    <>
      <Tooltip title="Languages">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Flag src="/static/img/flags/us.png" alt="English" />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>English</MenuItem>
        <MenuItem onClick={closeMenu}>French</MenuItem>
        <MenuItem onClick={closeMenu}>German</MenuItem>
        <MenuItem onClick={closeMenu}>Dutch</MenuItem>
      </Menu>
    </>
  )
}

export default LanguagesDropdown
