import React, { useRef, useCallback } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  ScrollView,
  PanGestureHandlerProps
} from 'react-native-gesture-handler'

import TaskItem from './TaskItem'
import { makeStyledComponent } from '../utils/makeStyledComponent'

export interface TaskItemData {
  id: string
  label: string
  done: boolean
}

export interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onRemove: (item: TaskItemData) => void
  onToggleItem: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onFinishEditing: (item: TaskItemData) => void
  onChangeLabel: (item: TaskItemData, newLabel: string) => void
}

interface Props {
  data: TaskItemData[]
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onFinishEditing: (item: TaskItemData) => void
  onChangeLabel: (item: TaskItemData, newLabel: string) => void
}

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

export const AnimatedTaskItem = ({
  data,
  isEditing,
  simultaneousHandlers,
  onRemove,
  onToggleItem,
  onPressLabel,
  onChangeLabel,
  onFinishEditing
}: TaskItemProps) => {
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])

  const handleChangeLabel = useCallback(
    label => {
      onChangeLabel(data, label)
    },
    [data, onChangeLabel]
  )

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])

  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        scale: 1,
        opacity: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        label={data.label}
        isDone={data.done}
        isEditing={isEditing}
        onToggle={handleToggleCheckbox}
        onChangeLabel={handleChangeLabel}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
        simultaneousHandlers={simultaneousHandlers}
      />
    </StyledView>
  )
}

const TaskList = ({
  data,
  editingItemId,
  onToggleItem,
  onRemoveItem,
  onPressLabel,
  onChangeLabel,
  onFinishEditing
}: Props) => {
  const refScrollView = useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map(item => (
          <AnimatedTaskItem
            key={`task-item-${item.id}`}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onRemove={onRemoveItem}
            onToggleItem={onToggleItem}
            onPressLabel={onPressLabel}
            onChangeLabel={onChangeLabel}
            onFinishEditing={onFinishEditing}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}

export default TaskList
