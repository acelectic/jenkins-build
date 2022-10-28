import React, { useMemo, useState } from "react"
import styled from "styled-components/macro"
import { rgba } from "polished"
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom"
import { RouteType, RouteChildType } from "../types/routes"
import PerfectScrollbar from "react-perfect-scrollbar"
import "../vendor/perfect-scrollbar.css"
import {
  Chip,
  Collapse,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { sidebarRoutes as routes } from "../routes/index"
import Authorize from "./Authorize"
import Sarabun from "./common/Sarabun"
import { PRIMARY_BG, SECONDARY_MAIN, SEMANTIC_ERROR_MAIN, WHITE } from "../constants/colors"
import { drawerWidth, hidingSize } from "../layouts/Dashboard"
import { useGetCurrentUserPermissions } from "../services/auth/auth-query"
import AllPerFormImage from "../assets/images/all-perform-logo.svg"
import { useTranslation } from "react-i18next"
import { config } from "../configs"
import Icon from "./common/Icon"
import qs from "qs"

const Drawer = styled(MuiDrawer)`
  border-right: 0;
  display: flex;

  > div {
    padding-top: 8px;
    padding-bottom: 8px;
    border-right: 0;
    background: ${SECONDARY_MAIN};
    width: ${drawerWidth};
  }
`

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  height: 100%;
  display: flex;
  flex-direction: column;
`

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.sidebar.background};
  height: 100%;
  display: flex;
`

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)}px;
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
  width: 100%;
`

const Brand = styled(ListItem)<{
  button?: boolean
  component?: React.ReactNode
  to?: string
}>`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  justify-content: flex-start;
  cursor: pointer;
  padding: 16px;
  display: flex;
  height: fit-content;

  ${(props) => props.theme.breakpoints.up(hidingSize)} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`

const AllPerFormImg = styled.img`
  width: 130px;
  height: 48px;
  margin-bottom: 4px;
`

type CategoryType = {
  activeClassName?: string
  button?: boolean
  onClick?: () => void
  to?: string
  component?: typeof NavLink
  exact?: boolean
}

const Category = styled(ListItem)<CategoryType>`
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  padding: 8px 16px 8px 32px;
  height: 64px;
  cursor: pointer;

  svg {
    font-size: 20px;
    color: ${WHITE};
    min-width: 30px;
    min-height: 30px;
    max-width: 30px;
    max-height: 30px;
    stroke: ${WHITE};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &.${(props) => props.activeClassName} {
    background-color: ${PRIMARY_BG};
    span {
      color: ${SECONDARY_MAIN};
    }

    svg {
      color: ${SECONDARY_MAIN};
      stroke: ${SECONDARY_MAIN};
    }
  }
`

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${WHITE};
    font-size: 16px;
    padding-left: 16px;
    font-weight: 600;
    font-family: "Sarabun";
    word-break: break-word;
  }
`

const CategoryIconLess = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`

const CategoryIconMore = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`

const Link = styled(ListItem)<{
  activeClassName: string
  component: typeof NavLink
  exact: boolean
  to: string
}>`
  padding: 8px 16px 8px 48px;
  height: 48px;
  justify-content: space-between;

  span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &.${(props) => props.activeClassName} {
    background-color: ${PRIMARY_BG};

    span {
      color: ${SECONDARY_MAIN};
    }
  }
`

const LinkText = styled(ListItemText)`
  color: ${(props) => props.theme.sidebar.color};
  span {
    font-size: 16px;
    font-weight: 600;
    font-family: "Sarabun";
    word-break: break-word;
    color: ${WHITE};
  }
  margin-top: 0;
  margin-bottom: 0;
`

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  min-height: 20px;
  min-width: 20px;
  max-height: 20px;
  max-width: 20px;
  cursor: pointer;
  background-color: ${SEMANTIC_ERROR_MAIN};
  padding-left: 0px;
  padding-right: 0px;
  span.MuiChip-label {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding: 0;
  }
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding: 0;
  }
`

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`

const SidebarSection = styled(Typography)`
  display: block;
  color: ${WHITE};
  padding: 16px;
  font-size: 18px;
  font-weight: 700;
  font-family: "Sarabun";
  word-break: break-word;
  height: 55px;
`

const SidebarFooter = styled.div`
  background-color: ${(props) => props.theme.sidebar.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)}px ${(props) => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  justify-content: space-between;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${PRIMARY_BG};
  width: 100%;
`

type SidebarCategoryPropsType = {
  name: string
  icon: JSX.Element
  classes?: string
  isOpen?: boolean
  isCollapsable: boolean
  badge?: string | number
  activeClassName?: string
  button: true
  onClick?: () => void
  to?: string
  component?: typeof NavLink
  exact?: boolean
}

const SidebarCategory: React.FC<SidebarCategoryPropsType> = ({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  button,
  ...rest
}) => {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? isOpen ? <CategoryIconMore /> : <CategoryIconLess /> : null}
      {badge ? <CategoryBadge label={badge} /> : ""}
    </Category>
  )
}

type SidebarLinkPropsType = {
  name: string
  to: string
  badge?: string | number
  icon?: JSX.Element
}

const SidebarLink: React.FC<SidebarLinkPropsType> = ({ name, to, badge, icon }) => {
  return (
    <Link dense component={NavLink} exact to={to} activeClassName="active">
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ""}
    </Link>
  )
}

const EmployeeModeButton: React.FC<SidebarCategoryPropsType> = ({
  name,
  icon,
  button,
  ...rest
}) => {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
    </Category>
  )
}

type SidebarPropsType = {
  classes?: string
  staticContext: string
  location: {
    pathname: string
  }
  routes: Array<RouteType>
  PaperProps: {
    style: {
      width: number
    }
  }
  variant?: "permanent" | "persistent" | "temporary"
  open?: boolean
  onClose?: () => void
}

const Sidebar: React.FC<RouteComponentProps & SidebarPropsType> = ({
  classes,
  staticContext,
  location,
  ...rest
}) => {
  const { t } = useTranslation()

  type tplotOptions = {
    [key: number]: boolean
  }
  const initOpenRoutes = (): tplotOptions => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname

    let _routes = {}

    routes.forEach((route: RouteType, index) => {
      const isActive = pathName.indexOf(route.path) === 0
      const isOpen = route.open
      const isHome = route.containsHome && pathName === "/"

      _routes = Object.assign({}, _routes, {
        [index]: isActive || isOpen || isHome,
      })
    })

    return _routes
  }

  const { data: permissions } = useGetCurrentUserPermissions()

  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes())

  const toggle = (index: number) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      (item) =>
        openRoutes[index] ||
        setOpenRoutes((openRoutes) => Object.assign({}, openRoutes, { [item]: false })),
    )

    // Toggle selected element
    setOpenRoutes((openRoutes) => Object.assign({}, openRoutes, { [index]: !openRoutes[index] }))
  }

  const headerGroups = useMemo(() => {
    const routesFilterPermissions = permissions
      ? routes.filter((route, index) => {
          return route.permissions?.find((routePermission) => permissions.includes(routePermission))
        })
      : routes
    const headers = routesFilterPermissions
      .map((item) => item.header)
      .filter((value, index, self) => self.indexOf(value) === index && value !== undefined)
    headers.splice(0, 0, undefined)
    return headers
  }, [permissions])

  return (
    <Drawer variant="permanent" {...rest}>
      <Brand component={NavLink} to="/">
        <Column>
          <AllPerFormImg src={AllPerFormImage} alt="AllPerFormImage" />
          <Sarabun type="H6" color={PRIMARY_BG} style={{ paddingBottom: 16 }}>
            {t("ระบบการประเมินผล - แอดมิน")}
          </Sarabun>
        </Column>
      </Brand>
      <Scrollbar>
        <List disablePadding>
          <Items>
            {headerGroups.map((headerGroup, id) => (
              <div key={id}>
                {headerGroup && <SidebarSection key={id}>{headerGroup}</SidebarSection>}

                {routes
                  .filter((route) => route.header === headerGroup)
                  .map((category: RouteType, index) => {
                    const onlyChildNotHidden = category.children?.filter((child) => !child.hidden)
                    return (
                      <Authorize key={index} permissions={category.permissions || []}>
                        {onlyChildNotHidden?.length && category.icon ? (
                          <div key={index}>
                            <Row>
                              <SidebarCategory
                                isOpen={!openRoutes[index]}
                                isCollapsable={true}
                                name={category.id}
                                icon={category.icon}
                                button={true}
                                onClick={() => toggle(index)}
                              />
                            </Row>
                            <Collapse in={openRoutes[index]} timeout="auto" unmountOnExit>
                              {onlyChildNotHidden?.map(
                                (route: RouteChildType, index: number) =>
                                  !route.hidden && (
                                    <SidebarLink
                                      key={index}
                                      name={route.name}
                                      to={route.path}
                                      icon={route.icon}
                                      badge={route.badge}
                                    />
                                  ),
                              )}
                            </Collapse>
                          </div>
                        ) : category.icon ? (
                          <SidebarCategory
                            isCollapsable={false}
                            name={category.id}
                            to={category.path}
                            activeClassName="active"
                            component={NavLink}
                            icon={category.icon}
                            // exact
                            button
                            badge={category.badge}
                          />
                        ) : null}
                      </Authorize>
                    )
                  })}
              </div>
            ))}
          </Items>
        </List>
        <SidebarFooter>
          <div />
          <EmployeeModeButton
            isCollapsable={false}
            name={"โหมดพนักงาน"}
            icon={<Icon iconName={"squareHalfSidebar"} />}
            button={true}
            onClick={() => {
              const params = {
                eko_action: "redirect_client_menus",
                clientId: config.EKO_CLIENT_ID,
                redirect_path: "",
              }
              const link = `${config.EKO_HOST}?${qs.stringify(params)}`
              window.open(link, "_blank")
            }}
          />
          <div />
        </SidebarFooter>
      </Scrollbar>
    </Drawer>
  )
}

export default withRouter(Sidebar)
