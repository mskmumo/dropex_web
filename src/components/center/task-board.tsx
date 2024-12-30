'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'

const initialTasks = {
  todo: [
    { id: 't1', content: 'Pick item from warehouse' },
    { id: 't2', content: 'Package for shipping' },
  ],
  inProgress: [
    { id: 't3', content: 'Check parcel status' },
  ],
  done: [
    { id: 't4', content: 'Update inventory' },
  ],
}

export function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks)

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return

    const sourceColumn = tasks[source.droppableId]
    const destColumn = tasks[destination.droppableId]
    const [removed] = sourceColumn.splice(source.index, 1)
    destColumn.splice(destination.index, 0, removed)

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(tasks).map(([columnId, tasks]) => (
          <Card key={columnId} className="bg-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900">{columnId.charAt(0).toUpperCase() + columnId.slice(1)}</CardTitle>
            </CardHeader>
            <CardContent>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 mb-2 rounded shadow"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        ))}
      </div>
    </DragDropContext>
  )
}

