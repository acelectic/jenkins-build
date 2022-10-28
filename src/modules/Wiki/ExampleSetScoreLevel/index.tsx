import { useCallback, useMemo } from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"
import Card from "../../../components/common/Card"
import SetScoreLevel, { scaleDetailsInitialValues } from "../../../components/common/SetScoreLevel"
import { mobile } from "../../../utils/responsive-helper"
import arrayMutators from "final-form-arrays"
import { ScaleDetail } from "../../../services/entity-typed"
import Button from "../../../components/common/Button"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  margin-bottom: 10px;
  ${mobile} {
    grid-template-columns: auto;
  }
`

export const temp: ScaleDetail[] = [
  {
    value: 1,
    color: "#D20F03",
    scaleName: "1",
    description: "xxxxxx",
  },
  {
    value: 2,
    color: "#FF6A16",
    scaleName: "2",
    description: "x",
  },
  {
    value: 3,
    color: "#FFC700",
    scaleName: "3",
    description: "x",
  },
  {
    value: 4,
    color: "#6BA808",
    scaleName: "4",
    description: "x",
  },
]

const ExampleSetScoreLevel = () => {
  const onSubmit = useCallback((values) => {
    console.debug("values : => ", values)
  }, [])

  const ScaleDetails = useMemo(() => {
    return scaleDetailsInitialValues.filter((v) => v.value <= 6) || []
  }, [])

  return (
    <Card>
      <GridLayout>
        <Form<{ jsonScaleDetails: ScaleDetail[] }>
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
        >
          {({ handleSubmit, values, invalid, initialValues }) => {
            return (
              <form onSubmit={handleSubmit}>
                <SetScoreLevel
                  // isViewMode
                  isEditLevel
                  jsonScaleDetails={temp}
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </form>
            )
          }}
        </Form>
        <pre>{`
        <Form<{ jsonScaleDetails: ScaleDetail[] }>
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
        >
          {({ handleSubmit, values, invalid, initialValues }) => {
            return (
              <form onSubmit={handleSubmit}>
                <SetScoreLevel
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </form>
            )
          }}
        </Form>
`}</pre>
      </GridLayout>
      <GridLayout>
        <Form<{ jsonScaleDetails: ScaleDetail[] }>
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
        >
          {({ handleSubmit, values, invalid, initialValues }) => {
            return (
              <form onSubmit={handleSubmit}>
                <SetScoreLevel isEditLevel />
                <Button onClick={handleSubmit}>Submit</Button>
              </form>
            )
          }}
        </Form>
        <pre>{`
        <Form<{ jsonScaleDetails: ScaleDetail[] }>
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
        >
          {({ handleSubmit, values, invalid, initialValues }) => {
            return (
              <form onSubmit={handleSubmit}>
                <SetScoreLevel
                isEditLevel
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </form>
            )
          }}
        </Form>
`}</pre>
      </GridLayout>
      <GridLayout>
        <SetScoreLevel isViewMode jsonScaleDetails={ScaleDetails} />
        <pre>{`
<SetScoreLevel
 isViewMode 
 jsonScaleDetails={ScaleDetails}
/>

const ScaleDetails : ScaleDetail[] = [
  {
    value: 1,
    color: "#D20F03",
    scaleName: "1",
    description: "ผลงานไม่น่าพึงพอใจ (Unsatisfactory) ",
  },
  {
    value: 2,
    color: "#FF6A16",
    scaleName: "2",
    description: "ผลงานไม่น่าพึงพอใจ (Unsatisfactory) ",
  },
]
`}</pre>
      </GridLayout>
    </Card>
  )
}

export default ExampleSetScoreLevel
