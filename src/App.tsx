
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import './App.css';
import Input from './components/Input';
import TextArea from './components/TextArea';

interface Arr  {
  blocks: {
    1: {
      id: string,
      text: string,
      tag: string
    },
    2: {
      id: string,
      text: string,
      tag: string
    }
  },
  columns: {
    'sidebar': {
      id: string,
      title: string,
      taskIds: number[]
    },
    'main': {
      id: string,
      title: string,
      taskIds: number[]
    }
  },
  columnOrder: ['sidebar', 'main']
}


const arr: Arr = {
  blocks: {
    1: {
      id: 'text',
      text: 'text',
      tag: 'div'
    },
    2: {
      id: 'image',
      text: 'image',
      tag: 'div'
    }
  },
  columns: {
    'sidebar': {
      id: 'sidebar',
      title: 'sidebar',
      taskIds: [1, 2]
    },
    'main': {
      id: 'main',
      title: 'redactor',
      taskIds: []
    }
  },
  columnOrder: ['sidebar', 'main']
}


function App() {

  const [items, setItems] = useState<Arr>(arr);
    
  const onDragEnd = (result: DropResult) => {
    
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if ( destination.droppableId === source.droppableId ) return

    if (destination.droppableId !== source.droppableId ) {

      if (draggableId === 'text') {
        const newItems = JSON.parse(JSON.stringify(items));
        if (result.destination) {
          newItems.columns.main.taskIds.splice(result.destination.index, 0, Object.keys(newItems.blocks).length + 1);

          newItems.blocks[Object.keys(newItems.blocks).length + 1] = {
            id: (Object.keys(newItems.blocks).length + 1).toString(),
            text: (Object.keys(newItems.blocks).length + 1).toString(),
            tag: 'textarea'
          }

          setItems(() => newItems);
        }

      }
      if (draggableId === 'image') {
        const newItems = JSON.parse(JSON.stringify(items));
        if (result.destination) { 
          newItems.columns.main.taskIds.splice(result.destination.index, 0, Object.keys(newItems.blocks).length + 1);

          newItems.blocks[Object.keys(newItems.blocks).length + 1] = {
            id: (Object.keys(newItems.blocks).length + 1).toString(),
            text: (Object.keys(newItems.blocks).length + 1).toString(),
            tag: 'input'
          }
  
          setItems(() => newItems);
        }
        
      }

    }

  }

  return (
    <div className="columns">
      <DragDropContext onDragEnd={onDragEnd}>
        {items.columnOrder.map(columnId => {
          const column = items.columns[columnId];
          
          const tasks = column?.taskIds?.map(taskId => (items.blocks as any)[taskId]);

          return (
            <Droppable isDropDisabled={columnId === 'sidebar' ? true : false} key={column.id} droppableId={column.id}>
              {(droppableProvided) => (
                <div 
                    className={`column ${column.id}`}
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                >
                {tasks.map(({id, text, tag}, index) => {
                  if (tag === 'div') {
                    return (
                      <Draggable key={id} draggableId={id} index={index} >
                        {(draggableProvided) => (
                              <div 
                                className='element'
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                              >
                                {text}
                              </div>
                            )

                        }
                      </Draggable>
                    )} else if(tag === 'textarea') {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                           {(draggableProvided) => (
                              <div 
                                  className='area'
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                              >
                                  <TextArea/>
                              </div>
                            )

                        }
                        </Draggable>
                      )
                    } else {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                           {(draggableProvided) => (
                            <label
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                              >
                               <Input/>
                            </label>
                            )

                        }
                        </Draggable>
                      )
                    }

                  })
                }
                {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
      </DragDropContext>
    </div>


  );
}

export default App;
