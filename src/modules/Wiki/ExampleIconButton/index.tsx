import { Box, Divider as MuiDivider } from "@mui/material"
import { Trash2 } from "react-feather"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import IconButton from "../../../components/common/IconButton"
import { spacing } from "@mui/system"
import Kanit from "../../../components/common/Kanit"
import { mobile } from "../../../utils/responsive-helper"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`
const BoxLayout = styled(Box)`
  margin-top: 50%;
`
const Divider = styled(MuiDivider)(spacing)
const ExampleIconButton = () => {
  return (
    <Card>
      <Kanit type="XsTitle">
        import IconButton from "../../../components/common/IconButton"
      </Kanit>
      <br />
      <GridLayout>
        <BoxLayout>
          <IconButton
            icon={<Trash2 />}
            onClick={() => {
              window.alert("Icon large")
            }}
            color="primary"
            iconSize="large"
          />
        </BoxLayout>
        <pre>{`       <IconButton
          icon={<Trash2 />}
          onClick={() => {
            window.alert("Icon large")
          }}
          color="error"
          fontSize="large"
        />`}</pre>
      </GridLayout>
      <Divider my={2} />
      <GridLayout>
        <BoxLayout>
          <IconButton
            icon={<Trash2 />}
            onClick={() => {
              window.alert("Icon default")
            }}
            color="error"
          />
        </BoxLayout>
        <pre>{`       <IconButton
          icon={<Trash2 />}
          onClick={() => {
            window.alert("Icon default")
          }}
          color="error"
          fontSize="default"
        />`}</pre>
      </GridLayout>
      <Divider my={2} />
      <GridLayout>
        <BoxLayout>
          <IconButton
            icon={<Trash2 />}
            onClick={() => {
              window.alert("Icon small")
            }}
            color="error"
            iconSize="small"
          />
        </BoxLayout>
        <pre>{`       <IconButton
          icon={<Trash2 />}
          onClick={() => {
            window.alert("Icon small")
          }}
          color="error"
          fontSize="small"
        />`}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleIconButton
