import {
  PRIMARY_BG,
  PRIMARY_DARK,
  SEMANTIC_ERROR_BG,
  BLACK,
  WHITE,
  GRAYSCALE_DARKGRAY_40,
  SEMANTIC_ERROR_DARK,
} from "../../constants/colors"
import Icon from "./Icon"
import Sarabun from "./Sarabun"
import styled from "@emotion/styled"
import { PropsWithChildren, useMemo } from "react"

const ShrinkWrapper = styled.div<{
  size?: "wrapContent" | "fullWidth"
}>`
  display: ${({ size }) => (size === "wrapContent" ? "table" : "inline")};
  width: ${({ size }) => (size === "wrapContent" ? "unset" : "100%")};
`

const AlertContainer = styled.div<{
  bgColor: string
}>`
  background-color: ${({ bgColor }) => bgColor};
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;

  display: grid;
  /* grid-template-columns: max-content auto; */
`

const AlertCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  border-radius: 8px;
`

const CommentContainer = styled.div`
  padding: 16px 24px 8px 24px;
  flex-direction: column;
`

const MessageLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const FrontLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ChildrenContainer = styled.div`
  margin: 8px 16px;
`

export type AlertProps = {
  text: string
  type: "info" | "error" | "light"
  size?: "wrapContent" | "fullWidth"
  onClose?: (() => void) | undefined
  comment?: string
}

const Alert = (props: PropsWithChildren<AlertProps>) => {
  const { text, type, size = "fullWidth", children, onClose, comment } = props

  const bgColor = useMemo(() => {
    if (type === "info") {
      return PRIMARY_BG
    } else if (type === "error") {
      return SEMANTIC_ERROR_BG
    }
    return GRAYSCALE_DARKGRAY_40
  }, [type])

  const fontColor = useMemo(() => {
    if (type === "info") {
      return PRIMARY_DARK
    } else if (type === "error") {
      return SEMANTIC_ERROR_DARK
    }
    return BLACK
  }, [type])

  return (
    <ShrinkWrapper size={size}>
      <AlertCommentWrapper
        style={{
          padding: comment ? 8 : 0,
          borderWidth: comment ? "1px" : undefined,
          borderStyle: comment ? "solid" : undefined,
          borderColor: comment ? fontColor : undefined,
        }}
      >
        <AlertContainer bgColor={bgColor}>
          <MessageLayout>
            <FrontLayout>
              {type !== "light" && (
                <>
                  <Icon
                    iconName={type === "info" ? "infoBlue" : "warningCircle"}
                    // iconName={'check"}
                    width={20}
                    height={20}
                    style={{ marginTop: 5 }}
                  />
                  <div style={{ width: 11 }} />
                </>
              )}
              <Sarabun
                size={14}
                weight={500}
                color={fontColor}
                // style={{ lineHeight: 1.3 }}
              >
                {text}
              </Sarabun>
            </FrontLayout>
            {onClose && <Icon iconName="close" onClick={onClose} width={20} height={20} />}
          </MessageLayout>
          {children ? <ChildrenContainer>{children}</ChildrenContainer> : <></>}
        </AlertContainer>
        <CommentContainer style={{ display: comment ? "flex" : "none" }}>
          <Sarabun type="Subtitle2" weight={600}>
            คอมเม้นต์จากหัวหน้า
          </Sarabun>
          <div style={{ height: 4 }} />
          <Sarabun type="Body2" weight={400}>
            {comment}
          </Sarabun>
        </CommentContainer>
      </AlertCommentWrapper>
    </ShrinkWrapper>
  )
}

export default Alert
