import styled from "@emotion/styled"
import Icon, { IconNameKeys } from "../../../components/common/Icon"

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
  display: flex;
`

export const IconNameList: IconNameKeys[] = [
  "add",
  "back",
  "check",
  "company",
  "etc",
  "home",
  "pen",
  "pin",
  "smiley",
  "trash",
  "close",
  "done",
  "squaresFour",
  "graduationCap",
  "checkCircle",
  "caretLeft",
  "graduationCapCircle",
  "copy",
  "cardHolder",
  "searchGlass",
  "undoCirlce",
  "arrowCounter",
  "filter",
  "circlesThree",
  "caretRightWhite",
  "smileyWhite",
  "folderOpen",
  "fileText",
  "clipBoardText",
  "chatText",
  "hourGlassLow",
  "xCircle",
]

const ExampleIconComponent = () => {
  return (
    <div>
      <pre>
        {`<IconNameCard
        fill={}
        stroke={}
        height={}
        width={}
        style={}
        {...restProps}
      />`}
      </pre>
      <div
        style={{
          display: "inline-grid",
          backgroundColor: "#ddfaff",
          gridTemplateColumns: "250px 250px 250px 250px 250px",
        }}
      >
        {IconNameList.sort().map((name, i) => {
          return (
            <IconBox key={i}>
              <Icon iconName={name} />
              {name}
            </IconBox>
          )
        })}

        <IconBox>
          <Icon iconName={"back"} />
          ไม่มี OnClick
        </IconBox>
        <IconBox>
          <Icon iconName={"add"} onClick={() => {}} />
          มี OnClick
        </IconBox>
      </div>
    </div>
  )
}

export default ExampleIconComponent
