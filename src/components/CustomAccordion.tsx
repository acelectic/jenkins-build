import AccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import { styled } from "@mui/material/styles"
import MuiAccordionDetails from "@mui/material/AccordionDetails"

import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_20,
  PRIMARY_MAIN,
  WHITE,
} from "../constants/colors"
import { useCallback, useMemo, useState } from "react"
import { makeStyles } from "@mui/styles"
import { Accordion, AccordionProps } from "@mui/material"
import Sarabun from "./common/Sarabun"
import { CheckboxField } from "./fields"
import Icon from "./common/Icon"

const CustomAccordionHeader = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // borderBottom: `1px solid yellow`,
  borderRadius: "8px 8px 8px 8px",
  "&:not(:last-child)": {},
  "&:before": {
    display: "none",
  },
}))

const CustomAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary expandIcon={<Icon iconName="caretUp" width={24} height={24} />} {...props} />
))(({ theme }) => ({
  backgroundColor: GRAYSCALE_LIGHTGRAY_20,
  flexDirection: "row-reverse",

  paddingLeft: "20.5px",
  height: "62px",
  borderBottom: `2px solid ${GRAYSCALE_DARKGRAY_40}`,
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root(.Mui-expanded)": {
    borderRadius: "unset",
  },
  "& .MuiAccordionSummary-content": {},
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // borderTop: '1px solid blue',
}))

const useStyle = makeStyles((theme) => ({
  topAccordion: {
    //  border: `5px solid red`,
    borderRadius: "8px 8px 0px 0px",
  },
  bottomAccordion: {
    // border: `5px solid blue`,
    borderBottom: `unset`,
    borderRadius: "0px 0px 8px 8px",
    "& .MuiAccordionSummary-root.Mui-expanded": {
      borderRadius: "unset",
    },
  },
  normalAccordion: {},
  borderAccordion: {
    border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
    borderRadius: "9px 9px 9px 9px",
    boxSizing: "border-box",
  },
  titleAccordion: {
    marginLeft: "12px",
    display: "flex",
    flex: 1,
    justifyItems: "end",
    alignItems: "end",
    textOverflow: "ellipsis",
    width: "50px",
  },
  numberSelectedAccordion: {
    borderRadius: "50%",
    backgroundColor: PRIMARY_MAIN,
    maxWidth: "20px",
    display: "flex",
    flex: 2,
    height: "20px",
    marginLeft: "16px",
    marginTop: "12px",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: GRAYSCALE_DARKGRAY_40,
    height: "1px",
    display: "flex",
    marginTop: "16px",
  },
  header: {
    display: "flex",
  },
  description: {
    marginLeft: "24px",
  },
}))

export type CustomAccordionProps = {
  accordionItems?: CustomAccordionItems[]
  // items?: KpiTransactionQuarter[] | undefined ไม่มี type เลยปิดไว้ครับ
  // kpiLibrarys?: KpiLibrary[] | undefined
  expandIndex?: number
  onSelected?: (selected: boolean) => void
  // expanded?: boolean
  // onChange?: (panel: string) => void
}
// & Omit<AccordionProps, "children"> ปิดไว้เพราะไม่มี type

export type CustomAccordionItems = {
  id: string
  title: string
  details: CustomAccordionDetailItem[] | undefined
}

export type CustomAccordionDetailItem = {
  id: string
  header: string
  description: string
}

const CustomAccordion = (props: CustomAccordionProps) => {
  const {
    // items,
    accordionItems,
    // kpiLibrarys,
    // style,
    expandIndex,
    onSelected,
    ...restProps
  } = props
  const classes = useStyle()
  const [expanded, setExpanded] = useState<string | false>(`${expandIndex}`)
  const initialDetailSelected = useMemo(() => {
    const _initial = accordionItems!.map((item) => {
      return { countSelected: 0 }
    })
    return _initial
  }, [accordionItems])

  const [detailSelected, setDetailSelected] = useState(initialDetailSelected)

  const handleChange = useCallback(
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    },
    [],
  )

  const handleOnChecked = useCallback(
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      let _temp = [...detailSelected]
      if (event.target.checked) {
        _temp[index].countSelected = _temp[index].countSelected + 1
      } else {
        _temp[index].countSelected = _temp[index].countSelected - 1
      }
      setDetailSelected(_temp)

      onSelected?.(event.target.checked)
    },
    [detailSelected, onSelected],
  )

  const checkStyleAccording = useCallback(
    (index: number) => {
      if (index === 0) {
        return classes.topAccordion
        // } else if (index + 1 === items?.length) {
        //   return classes.bottomAccordion
      } else {
        return classes.normalAccordion
      }
    },
    [classes.normalAccordion, classes.topAccordion],
  )

  return (
    <div className={classes.borderAccordion}>
      {accordionItems?.map((accordionItem, index) => {
        return (
          <CustomAccordionHeader
            key={index}
            expanded={`${index}` === expanded}
            onChange={handleChange(`${index}`)}
            {...restProps}
          >
            <CustomAccordionSummary className={checkStyleAccording(index)}>
              <Sarabun type="H5" weight={700} className={classes.titleAccordion}>
                {`${accordionItem.title}`}
              </Sarabun>
              {detailSelected[index].countSelected <= 0 ? (
                ""
              ) : (
                <div className={classes.numberSelectedAccordion}>
                  <Sarabun size={10} weight={600} color={WHITE}>
                    {`${detailSelected[index].countSelected}`}
                  </Sarabun>
                </div>
              )}
            </CustomAccordionSummary>
            <AccordionDetails>
              {accordionItem.details?.map((detail, indexDetail) => {
                return (
                  <div key={indexDetail}>
                    <div className={classes.header}>
                      <CheckboxField
                        name={`${accordionItem.id}.checked`}
                        label={
                          <Sarabun type="H6" weight={700}>
                            {detail.header}
                          </Sarabun>
                        }
                        type="checkbox"
                        value={`${detail.id}`}
                        onChange={handleOnChecked(index)}
                      />
                    </div>
                    <div className={classes.description}>
                      <Sarabun type="Body2" weight={400}>
                        {detail.description}
                      </Sarabun>
                    </div>
                    <div className={classes.divider}></div>
                  </div>
                )
              })}
            </AccordionDetails>
          </CustomAccordionHeader>
        )
      })}
    </div>
  )
}

export default CustomAccordion
