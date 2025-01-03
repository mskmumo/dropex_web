"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'
import { createClientSupabaseClient } from "@/lib/supabase"

interface Task {
  id: string
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
}

export function TaskBoard() {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  })
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
      
      if (error) {
        console.error('Error fetching tasks:', error)
      } else {
        const groupedTasks = data.reduce((acc, task) => {
          if (!acc[task.status]) {
            acc[task.status] = []
          }
          acc[task.status].push(task)
          return acc
        }, {} as { [key: string]: Task[] })
        setTasks(groupedTasks)
      }
    }

    fetchTasks()

    const subscription = supabase
      .channel('tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
        fetchTasks()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const onDragEnd = async (result) => {
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

    // Update task status in Supabase
    const { error } = await supabase
      .from('tasks')
      .update({ status: destination.droppableId })
      .eq('id', removed.id)

    if (error) {
      console.error('Error updating task status:', error)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <Card key={columnId} className="bg-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900">{columnId}</CardTitle>
            </CardHeader>
            <CardContent>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {columnTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 mb-2 rounded shadow"
                          >
                            {task.title}
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

