import { ExpandMore } from "@mui/icons-material"
import { Accordion, Paper } from "@mui/material"
import withStyles from "@mui/styles/withStyles"
import {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react"
import { BLACK, WHITE } from "../../constants/colors"
import { createCtx, withCtx } from "../../utils/helper"
import { breakpoints } from "../../utils/responsive-helper"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { Collapse as MuiCollapse } from "@mui/material"

const CollapsePaper = withStyles({
  root: {
    borderRadius: "0.938rem",
    overflow: "hidden",
  },
})(Paper)

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
    minHeight: "3.25rem",
    margin: 0,
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    borderWidth: 0,
    [breakpoints.down("sm")]: {
      paddingTop: "0.6rem",
      paddingBottom: "0.6rem",
      paddingLeft: "1.3rem",
      paddingRight: "1.3rem",
    },
    "&$expanded": {
      minHeight: "3.25rem",
      margin: 0,
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      [breakpoints.down("sm")]: {
        paddingTop: "0.6rem",
        paddingBottom: "0.6rem",
        paddingLeft: "1.3rem",
        paddingRight: "1.3rem",
      },
    },
  },
  content: {
    "&$expanded": {
      margin: 0,
      padding: 0,
    },
    display: "block",
  },
  expanded: {},
}))(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: WHITE,
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "0.6rem",
    paddingBottom: "1.5rem",
    [breakpoints.down("sm")]: {
      paddingLeft: "1.3rem",
      paddingRight: "1.3rem",
    },
  },
}))(MuiAccordionDetails)

const AccordionIcon = withStyles({
  root: {
    color: BLACK,
    backgroundColor: WHITE,
    padding: 3,
    borderRadius: "0.8rem",
  },
})(ExpandMore)

const UnexpandedAccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: WHITE,
    color: "white",
    paddingLeft: "3.5rem",
    paddingRight: "3.5rem",
    paddingTop: "2.75rem",
    paddingBottom: "2.313rem",
    height: "3.25",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 0,
    [breakpoints.down("sm")]: {
      paddingLeft: "1.3rem",
      paddingRight: "1.3rem",
    },
  },
}))(Paper)

const UnexpandedAccordionDetail = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
    paddingLeft: "3.5rem",
    paddingRight: "3.5rem",
    paddingTop: "0.6rem",
    paddingBottom: "1.5rem",
    [breakpoints.down("sm")]: {
      paddingLeft: "1.875rem",
    },
  },
}))(Paper)

export type CollapseItemType = {
  title: string | ReactNode
  content: ReactNode
  header?: ReactNode
  disabled?: boolean
  expanded?: boolean
  contentDisabled?: boolean
}

const CollapseCtx = createCtx({
  defaultExpanded: undefined as Pick<
    CollapseProps,
    "defaultExpanded"
  >["defaultExpanded"],
})
const CollapseCtxWrapper = withCtx<
  PropsWithChildren<Pick<CollapseProps, "defaultExpanded">>
>(CollapseCtx)(
  (props: PropsWithChildren<Pick<CollapseProps, "defaultExpanded">>) => {
    const { defaultExpanded } = props
    const [, setState] = useContext(CollapseCtx)
    useEffect(() => {
      setState({
        defaultExpanded: defaultExpanded,
      })
    }, [defaultExpanded, setState])
    return <>{props.children}</>
  }
)

type CollapseProps = {
  items?: Array<CollapseItemType>
  defaultExpanded?: boolean | undefined
  children?: ReactNode
  className?: string
  style?: CSSProperties
  headerStyle?: CSSProperties
  iconExpandStyle?: CSSProperties
  contentStyle?: CSSProperties
  collapsePaperStyle?: CSSProperties
}
// TODO: Add shadows
const Collapse = (props: CollapseProps) => {
  const {
    items,
    defaultExpanded = undefined,
    children,
    headerStyle,
    iconExpandStyle,
    contentStyle,
    collapsePaperStyle,
    ...restProps
  } = props
  return (
    <CollapseCtxWrapper defaultExpanded={defaultExpanded}>
      <div {...restProps}>
        {!children &&
          items?.map((item) => {
            const {
              title,
              content,
              disabled = false,
              expanded = true,
              contentDisabled = false,
            } = item
            return !disabled ? (
              <CollapsePaper
                key={`${title}`}
                elevation={1}
                style={collapsePaperStyle}
              >
                <Accordion
                  key={`${title}`}
                  defaultExpanded={
                    defaultExpanded !== undefined ? defaultExpanded : expanded
                  }
                  elevation={0}
                  TransitionComponent={MuiCollapse}
                  TransitionProps={{ timeout: 200 }}
                >
                  <AccordionSummary
                    expandIcon={
                      <AccordionIcon
                        className="expand-icon"
                        width={30}
                        height={30}
                        style={{ ...iconExpandStyle }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ ...headerStyle }}
                  >
                    <div>{title}</div>
                  </AccordionSummary>
                  <div
                    style={
                      contentDisabled
                        ? { pointerEvents: "none", opacity: "0.4" }
                        : {}
                    }
                  >
                    <AccordionDetails style={contentStyle}>
                      {content}
                    </AccordionDetails>
                  </div>
                </Accordion>
              </CollapsePaper>
            ) : (
              <CollapsePaper
                key={`${title}`}
                elevation={0}
                style={{ ...collapsePaperStyle }}
              >
                <UnexpandedAccordionSummary square={true} elevation={0}>
                  <div>{title}</div>
                </UnexpandedAccordionSummary>
                <UnexpandedAccordionDetail>{content}</UnexpandedAccordionDetail>
              </CollapsePaper>
            )
          })}
        {children && children}
      </div>
    </CollapseCtxWrapper>
  )
}

type CollapseItemProps = PropsWithChildren<Omit<CollapseItemType, "content">>
const CollapseItem = (props: CollapseItemProps) => {
  const { title, children, header, disabled = false, expanded = true } = props
  const [state] = useContext(CollapseCtx)
  const { defaultExpanded } = state
  const localDefaultExpanded = useMemo(() => {
    return defaultExpanded !== undefined ? defaultExpanded : expanded
  }, [defaultExpanded, expanded])
  return (
    <CollapsePaper key={`${title}`} elevation={0}>
      {!disabled ? (
        <Accordion
          key={`${title}`}
          defaultExpanded={localDefaultExpanded}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<AccordionIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {!header && <div>{title}</div>}
            {header && header}
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      ) : (
        <CollapsePaper key={`${title}`} elevation={0}>
          <UnexpandedAccordionSummary square={true} elevation={0}>
            <div>{title}</div>
          </UnexpandedAccordionSummary>
          <UnexpandedAccordionDetail>{children}</UnexpandedAccordionDetail>
        </CollapsePaper>
      )}
    </CollapsePaper>
  )
}

Collapse.Item = CollapseItem

export default Collapse
