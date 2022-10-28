import Sarabun from "../../../../components/common/Sarabun"
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd"
import { useCallback, useRef } from "react"
import { FieldArray, FieldArrayRenderProps } from "react-final-form-arrays"
import { InputField } from "../../../../components/fields"
import Box from "@mui/material/Box"
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import { makeStyles } from "@mui/styles"
import styled from "@emotion/styled"
import { GRAYSCALE_DARKGRAY_60, SECONDARY_BG } from "../../../../constants/colors"
import { ITemplateBehaviorDetail } from ".."

const InputEvaluationArea = styled.div<{
  isDragging: boolean
  DraggableProvidedDraggableProps?: DraggingStyle | NotDraggingStyle
}>`
  user-select: none;
  display: flex;
  background: ${({ isDragging }) => (isDragging ? "darkgrey" : `${SECONDARY_BG}`)};
  color: ${({ isDragging }) => (isDragging ? "white" : "black")};
  padding: 16px;
  margin: 0%;
  width: 100%;
  height: 100%;

  border-radius: 8px;
`

const useStyle = makeStyles((theme) => ({
  indexEvaluation: {
    display: "flex",
    marginBottom: 24,
  },
  trashIconArea: {
    display: "flex",
    alignItems: "center",
  },
}))

const SettingTemplateBehavior = () => {
  const classes = useStyle()

  const fieldsRef = useRef<FieldArrayRenderProps<ITemplateBehaviorDetail, HTMLElement>["fields"]>()

  const onDragEnd = useCallback((
    result: DropResult,
    //  fields: FieldArrayRenderProps<any, HTMLElement>["fields"]
  ) => {
    const { source, destination } = result

    if (!destination) {
      return
    }
    if (fieldsRef.current?.value) {
      const { value: behaviorDetails } = fieldsRef.current

      const sourceValue = behaviorDetails?.[source.index]
      const destinationValue = behaviorDetails?.[destination.index]
      fieldsRef.current.update(source.index, destinationValue)
      fieldsRef.current.update(destination.index, sourceValue)
    }
  }, [])

  const onClickAddEvaluator = useCallback(() => {
    fieldsRef.current?.push({ headerEvaluator: "", detailEvaluator: "" })
  }, [])

  const onClickDelete = useCallback(
    (
      fields: FieldArrayRenderProps<ITemplateBehaviorDetail, HTMLElement>["fields"],
      index: number,
    ) => {
      fields.remove(index)
    },
    [],
  )

  const required = useCallback((value: string) => {
    return value ? undefined : "Required"
  }, [])

  return (
    <div
      style={{
        border: `1px solid ${GRAYSCALE_DARKGRAY_60}`,
        borderRadius: 8,
        padding: 16,
      }}
    >
      <Sarabun>หัวข้อการประเมิน</Sarabun>
      <Box height={30} />
      <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
        <Droppable droppableId={"templateBehavior"}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                <FieldArray<ITemplateBehaviorDetail> name="templateBehaviors">
                  {({ fields }) => {
                    fieldsRef.current = fields
                    return (
                      <div>
                        {fields.map((name, index) => {
                          return (
                            <Draggable key={name} draggableId={`${name}${index}`} index={index}>
                              {(providedNew, snapshotNew) => {
                                return (
                                  <div className={classes.indexEvaluation}>
                                    <Sarabun
                                      style={{
                                        whiteSpace: "nowrap",
                                      }}
                                      type="Subtitle1"
                                    >{`${index + 1}.`}</Sarabun>
                                    <Box width={24} />
                                    <InputEvaluationArea
                                      key={name}
                                      ref={providedNew.innerRef}
                                      {...providedNew.dragHandleProps}
                                      {...providedNew.draggableProps}
                                      // style={getItemStyle(
                                      //   snapshotNew.isDragging,
                                      //   providedNew.draggableProps.style
                                      // )}
                                      style={{
                                        ...providedNew.draggableProps.style,
                                      }}
                                      isDragging={snapshotNew.isDragging}
                                    >
                                      <div className={classes.trashIconArea}>
                                        <Icon
                                          iconName="dotsNine"
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        />
                                      </div>
                                      <Box width={16} />
                                      <InputField
                                        name={`${name}.headerEvaluator`}
                                        placeholder="กรอกหัวข้อการประเมิน"
                                        multiline
                                        style={{
                                          width: "40%",
                                        }}
                                        validate={required}
                                      />
                                      <Box width={20} />
                                      <InputField
                                        name={`${name}.detailEvaluator`}
                                        placeholder="กรอกรายละเอียดการประเมิน"
                                        multiline
                                        rows={3}
                                        style={{
                                          width: "60%",
                                        }}
                                        validate={required}
                                      />
                                      <Box width={16} />
                                      <div className={classes.trashIconArea}>
                                        <Icon
                                          iconName="trash"
                                          onClick={onClickDelete.bind(null, fields, index)}
                                        />
                                      </div>
                                    </InputEvaluationArea>
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                      </div>
                    )
                  }}
                </FieldArray>
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button style={{ width: "30%" }} buttonType="outlined" onClick={onClickAddEvaluator}>
          + เพิ่มหัวข้อการประเมิน
        </Button>
      </div>
    </div>
  )
}

export default SettingTemplateBehavior
